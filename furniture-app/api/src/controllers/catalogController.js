const router = require('express').Router();
const furnitureService = require('../services/furnitureService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    let ownerId = '';

    if (req.query.where) {
        ownerId = req.query.where.split('=')[1];
        ownerId = ownerId.substring(1, ownerId.length - 1);

        let furniture = await furnitureService.getOwn(req.user._id);
        res.json(furniture);
    } else {
        let furniture = await furnitureService.getAll();
        res.json(furniture);
    }

});

router.post('/', isAuth, async (req, res) => {
    await furnitureService.create({ ...req.body, _ownerId: req.user?._id });

    res.json({ ok: true });
});

router.put('/:furnitureId', isAuth, async (req, res) => {
    await furnitureService.edit(req.params.furnitureId, req.body);

    res.json({ ok: true });
});

router.get('/:furnitureId', async (req, res) => {
    let furniture = await furnitureService.getOne(req.params.furnitureId);

    res.json(furniture);
});

router.delete('/:furnitureId', isAuth, async (req, res) => {
    await furnitureService.delete(req.params.furnitureId);

    res.json({ ok: true });
})

module.exports = router;