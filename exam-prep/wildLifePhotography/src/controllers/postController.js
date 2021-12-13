const router = require('express').Router();

const postService = require('../services/postService');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/all', async (req, res) => {
    let posts = await postService.getAll();
    res.render('post', { posts });
});

router.get('/create', isAuth, (req, res) => {
    res.render('post/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        let { title, keyword, location, date, image, description } = req.body;

        let author = req.user._id;
        let post = await postService.create({ title, keyword, location, date, image, description, author });

        // await authService.addPost(post._id, author);

        res.redirect('/post/all');
    } catch (error) {
        res.render('post/create', { error: error.message })
    }
});

router.get('/:postId/details', async (req, res) => {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    let author = await authService.getOne(postData.author);
    let authorFullName = author.firstName + ' ' + author.lastName;
    let votedP = '';

    if (post.votesOnPost) {
        await Promise.all(post.votesOnPost.map(async x => {
            let votedUser = await authService.getOne(x);
            votedP += votedUser.email + ', ';
        }));
    }

    let votedUsers = votedP.substring(0, votedP.length - 2);
    let isOwner = postData.author == req.user?._id;

    let isntVoted = post.votesOnPost.some(x => x._id == req.user?._id);

    res.render('post/details', { ...postData, authorFullName, isOwner, isntVoted, votedUsers });
});

router.get('/:postId/voteUp', isntOwner, async (req, res) => {
    await postService.voteUp(req.params.postId, req.user?._id);

    res.redirect(`/post/${req.params.postId}/details`);
});

router.get('/:postId/voteDown', isntOwner, async (req, res) => {
    await postService.voteDown(req.params.postId, req.user?._id);

    res.redirect(`/post/${req.params.postId}/details`);
});

router.get('/:postId/delete', isOwner, async (req, res) => {
    await postService.delete(req.params.postId);

    // await authService.deletePost(req.params.postId, req.user?._id);

    res.redirect('/post/all');
});

router.get('/:postId/edit', isOwner, async (req, res) => {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    res.render('post/edit', { ...postData });
});

router.post('/:postId/edit', isOwner, async (req, res) => {
    try {
        await postService.edit(req.params.postId, req.body);

        res.redirect(`/post/${req.params.postId}/details`);
    }
    catch (error) {
        res.render(`post/edit`, { error: error.message });
    }
});

router.get('/mine', isAuth, async (req, res) => {
    let posts = await postService.getMine(req.user._id);

    res.render('post/mine', { posts });
});

async function isOwner(req, res, next) {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    if (postData.author != req.user?._id) {
        res.redirect(`404`);
    } else {
        next();
    }
}

async function isntOwner(req, res, next) {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    if (postData.author == req.user?._id) {
        res.redirect(`404`);
    } else {
        next();
    }
}

module.exports = router;