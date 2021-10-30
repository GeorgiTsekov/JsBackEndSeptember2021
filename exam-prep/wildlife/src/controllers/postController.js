const router = require('express').Router();

const postService = require('../services/postService');
const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    let posts = await postService.getAll();

    res.render('post', { posts });
});

router.get('/mine', async (req, res) => {
    let posts = await postService.getMine(req.user._id);

    res.render('post/mine', { posts });
});

router.get('/create', isAuth, (req, res) => {
    res.render('post/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        let { title, keyword, location, date, image, description } = req.body;

        let author = req.user._id;
        let post = await postService.create({ title, keyword, location, date, image, description, author });
        
        await authService.addPost(post._id, author);
        console.log(author);
        res.redirect('/post');
    } catch (error) {
        res.render('post/create', { error: error.message })
    }
});

router.get('/:postId/details', async (req, res) => {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    let isOwner = postData.author == req.user?._id;
    let user = await authService.getOne(postData?.author);
    let userData = await user.toObject();
    let email = userData.email;

    let votesOnPost = post.votesOnPost;

    let isNotVoted = post.votesOnPost.some(x => x._id == req.user?._id);

    res.render('post/details', { ...postData, email, isOwner, votesOnPost, isNotVoted });
});

router.get('/:postId/upVote', isOwner, async (req, res) => {
    await postService.addVotesOnPost(req.params.postId, req.user?._id, true);

    res.redirect(`/post/${req.params.postId}/details`);
});

router.get('/:postId/downVote', isOwner, async (req, res) => {
    await postService.addVotesOnPost(req.params.postId, req.user?._id, false);

    res.redirect(`/post/${req.params.postId}/details`);
});

router.get('/:postId/delete', isOwner, async (req, res) => {
    await postService.delete(req.params.postId);

    await authService.deletePost(req.params.postId, req.user?._id);


    res.redirect('/post');
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
        res.render('post/edit', { error: error.message });
    }
});

async function isOwner(req, res, next) {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    if (postData.owner == req.user?._id) {
        res.redirect(`/post/${req.params.postId}/details`);
    } else {
        next();
    }
}

async function isntOwner(req, res, next) {
    let post = await postService.getOne(req.params.postId);
    let postData = await post.toObject();

    if (postData.owner != req.user?._id) {
        res.redirect(`/post/${req.params.postId}/details`);
    } else {
        next();
    }
}

module.exports = router;