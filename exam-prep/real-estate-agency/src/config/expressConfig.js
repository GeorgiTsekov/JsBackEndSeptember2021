const express = require('express');
const path = require('path');

function expressConfig(app) {
    app.use('/static', express.static(path.resolve(__dirname, '../static')));
}

module.exports = expressConfig;