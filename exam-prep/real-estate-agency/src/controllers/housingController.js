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

router.get('/:housingId/details', isAuth, async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user._id;

    res.render('housing/details', { ...housing, isOwner });
})

module.exports = router;