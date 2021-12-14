const router = require('express').Router();

const publicationService = require('../services/publicationService');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/all', async (req, res) => {
    let publications = await publicationService.getAll();
    res.render('publication', { publications });
});

router.get('/create', isAuth, (req, res) => {
    res.render('publication/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        let { title, paintingTech, picture, certificate } = req.body;

        let author = req.user._id;
        let publication = await publicationService.create({ title, paintingTech, picture, certificate, author });

        // await authService.addpublication(publication._id, author);

        res.redirect('/publication/all');
    } catch (error) {
        res.render('publication/create', { error: error.message })
    }
});

router.get('/:publicationId/details', async (req, res) => {
    let publication = await publicationService.getOne(req.params.publicationId);
    let publicationData = await publication.toObject();

    let user = await authService.getOne(publicationData.author);
    let authorUsername = user.username;
    let isOwner = publicationData.author == req.user?._id;

    let isntShared = publication.usersShared.some(x => x._id == req.user?._id);

    res.render('publication/details', { ...publicationData, isOwner, isntShared, authorUsername });
});

router.get('/:publicationId/share', isntOwner, async (req, res) => {
    await publicationService.share(req.params.publicationId, req.user?._id);

    res.redirect(`/`);
});

router.get('/:publicationId/delete', isOwner, async (req, res) => {
    await publicationService.delete(req.params.publicationId);

    // await authService.deletePublication(req.params.publicationId, req.user?._id);

    res.redirect('/publication/all');
});

router.get('/:publicationId/edit', isOwner, async (req, res) => {
    let publication = await publicationService.getOne(req.params.publicationId);
    let publicationData = await publication.toObject();

    res.render('publication/edit', { ...publicationData });
});

router.post('/:publicationId/edit', isOwner, async (req, res) => {
    try {
        await publicationService.edit(req.params.publicationId, req.body);

        res.redirect(`/publication/${req.params.publicationId}/details`);
    }
    catch (error) {
        res.render(`publication/edit`, { error: error.message });
    }
});

router.get('/mine', isAuth, async (req, res) => {
    let user = await authService.getOne(req.user._id);
    let myPublications = await publicationService.getMyPublications(req.user._id);
    let sharedPublications = await publicationService.getMySharedPublications(req.user._id);
    let username = user.username;
    let address = user.address;
    let myTitles = '';
    let mySharedTitles = '';
    myPublications.forEach(myPublication => {
        myTitles += myPublication.title + ', ';
    });
    sharedPublications.forEach(sharedPublication => {
        mySharedTitles += sharedPublication.title + ', ';
    });
    let mytTitless = myTitles.substring(0, myTitles.length - 2);
    let mySharedTitless = mySharedTitles.substring(0, mySharedTitles.length - 2);
    res.render('publication/mine', { username, address, mytTitless, mySharedTitless });
});

async function isOwner(req, res, next) {
    let publication = await publicationService.getOne(req.params.publicationId);
    let publicationData = await publication.toObject();

    if (publicationData.author != req.user?._id) {
        res.redirect(`404`);
    } else {
        next();
    }
}

async function isntOwner(req, res, next) {
    let publication = await publicationService.getOne(req.params.publicationId);
    let publicationData = await publication.toObject();

    if (publicationData.author == req.user?._id) {
        res.redirect(`404`);
    } else {
        next();
    }
}

module.exports = router;