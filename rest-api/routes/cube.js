const { Router } = require('express');

const Cube = require('../models/Cube');

const router = Router();

router.get('/all', async (req, res) => {
    const cubes = await Cube.find();

    res.status(200).json({
        cubes
    })
});

router.post('/new', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficulty
    } = req.body;

    const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

    await cube.save();

    res.status(201).json({
        message: `Cube ${name} is successfully created`
    });
});

router.delete('/delete', async (req, res) => {
    const { id } = req.body;

    await Cube.findByIdAndDelete(id);

    res.status(200).json({
        message: 'Cube is deleted successfully'
    });
});

router.patch('/edit/:id', async (req, res) => {
    const { name, description, imageUrl, difficulty } = req.body;

    const id = req.params.id;

    await Cube.findByIdAndUpdate(id, { name, description, imageUrl, difficulty });

    res.status(200).json({
        message: 'Cube is updated successfully'
    });
})

module.exports = router;