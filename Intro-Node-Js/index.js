const http = require('http');
const fs = require('fs');

let app = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.write('<h1>Homepage</h1> <a href="/cats">go cats</a>')
            break;
        case '/cats':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            let result = fs.readFileSync('./views/cats.html');
            res.write(result);
            break;
        case '/img/png-clipart-the-waving-cat-cats-paw-cat.png':
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            //TODO: finish with streams
            break;
        default:
            res.write('Error page 404')
            break;
    }

    res.end();
});

app.listen(5000);

console.log('Node.js server running on port 5000...')