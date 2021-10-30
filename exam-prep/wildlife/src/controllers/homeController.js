const router = require('express').Router();

// const postService = require('../services/postService');

router.get('/', async (req, res) => {

    res.render('home');
});

// router.get('/search', async (req, res) => {
//     let searchedText = req.query?.text;
//     if (!searchedText) {
//         searchedText = '';
//     }
//     let post = await postService.search(searchedText);

//     res.render('search', { title: 'Search Housing', post });
// });

module.exports = router;