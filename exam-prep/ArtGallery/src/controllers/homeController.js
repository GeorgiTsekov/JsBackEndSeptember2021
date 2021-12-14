const router = require('express').Router();

const publicationService = require('../services/publicationService');

router.get('/', async (req, res) => {

    let publications = await publicationService.getAll();

    res.render('home', { publications });
});

module.exports = router;