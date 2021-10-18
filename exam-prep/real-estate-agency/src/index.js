const express = require('express');

const app = express();
const { PORT } = require('./constants');

require('./config/express-config')(app);
require('./config/hbs-config')(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}/`));