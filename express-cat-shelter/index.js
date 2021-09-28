const express = require('express');
const path = require('path');
const fs = require('fs');
const handlebars = require('express-handlebars');

const catController = require('./controllers/catController.js');
const requestLogger = require('./middlewares/requestLoggerMiddlewares.js');

const app = express();

app.engine('hbs', handlebars({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(express.static('./public'));

// app.use(requestLogger); // application level
// app.use('/cats', requestLogger); // root level

// app.use('/cats', requestLogger, catController); // controller level
app.use('/cats', catController);

app.get('/', (req, res) => {
    // Custom HTML response
    // let absolutePath = path.join(__dirname, '/views/home/index.html');
    // let absolutePath = path.resolve(__dirname, './views/home/index.html');

    // res.sendFile(absolutePath);

    // render with handlebars
    res.render('home');
});

app.get('/add-breed', (req, res) => {
    res.render('addBreed');
});

app.get('/add-cat/:catName?', (req, res) => {
    let breeds = [
        {breed: 'Persian'},
        {breed: 'Angora'},
        {breed: 'StreetAndBeauty'},
    ];

    res.render('addCat', {
        name: req.params.catName,
        breeds
    });
});

app.get('/download', (req, res) => {
    // res.header({
    //     'Content-Type': 'text/html'
    //     'Content-Disposition': 'attachment: filename="paw-cat.png"'
    // });
    // res.write(`<h1>Cat Profile</h1><h2>${req.params.catName}</h2>`);

    res.download('./images/paw-cat.png');

    // let imageStream = fs.createReadStream('./images/paw-cat.png');

    // imageStream.pipe(res);

    // res.end();
});

app.get('/send-file', (req, res) => {
    res.sendFile('./images/paw-cat.png', {
        root: __dirname
    });
});

app.get('/data', (req, res) => {
    res.json({ name: 'Pesho', age: 7 })
});

app.get('/add*', (req, res) => {
    res.write('Add something else');
    res.end();
});

app.get(/.*cat.*/i, (req, res) => {
    res.write('Cat Detected!!!');
    res.end();
})

app.listen(5000, () => {
    console.log('Server is running on port 5000...');
});