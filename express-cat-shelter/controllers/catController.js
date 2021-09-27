const express = require('express');
const router = express.Router();
const requestLogger = require('../middlewares/requestLoggerMiddlewares.js');

router.get('/Pesho', (req, res) => {
    res.write('<h1>Pesho Rulez</h1>');
    res.end();
});

router.get('/:catName', requestLogger, (req, res) => {
    if (req.params.catName == 'Pesho123') {
        return res.redirect('/cats/Pesho');
    }

    res.header({
        'Content-Type': 'text/html'
    });

    res.write(`<h1>Cat Profile</h1><h2>${req.params.catName}</h2>`);
    res.end();
});

module.exports = router;