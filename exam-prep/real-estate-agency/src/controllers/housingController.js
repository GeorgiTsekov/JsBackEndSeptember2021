const router = require('express').Router();

const housingService = require('../services/housingService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', { housings });
});

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    let { name, type, year, city, image, description, availablePieces } = req.body;

    let owner = req.user._id;
    await housingService.create({ name, type, year, city, image, description, availablePieces, owner });

    res.redirect('/housing');
});

router.get('/:housingId/details', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);
    let housingData = await housing.toObject();

    let isOwner = housingData.owner == req.user?._id;

    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;
    let isRented = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRented });
});

router.get('/:housingId/rent', async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user?._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get('/:housingId/delete', isAuth, async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);
    let housingData = await housing.toObject();
    let isOwner = housingData.owner == req.user?._id;

    if (isOwner) {
        await housingService.delete(req.params.housingId);
    }

    res.redirect('/housing');
})

module.exports = router;