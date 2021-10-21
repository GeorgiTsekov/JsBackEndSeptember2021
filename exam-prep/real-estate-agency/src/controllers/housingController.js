const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', {housings});
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    let { name, type, year, city, image, description, availablePieces } = req.body;

    let owner = req.user._id;
    await housingService.create({ name, type, year, city, image, description, availablePieces, owner });

    res.redirect('/housing');
});

module.exports = router;