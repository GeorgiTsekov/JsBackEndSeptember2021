const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', (req, res) => {
    res.render('housing');
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    let { name, type, year, city, image, description, availablePieces } = req.body;

    await housingService.create({name, type, year, city, image, description, availablePieces});

    res.redirect('/housing');
});

module.exports = router;