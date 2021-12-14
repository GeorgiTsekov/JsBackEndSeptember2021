const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
    // app.locals.title = 'Real Estate';
    app.use('/style', express.static(path.resolve(__dirname, '../style')));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfig;