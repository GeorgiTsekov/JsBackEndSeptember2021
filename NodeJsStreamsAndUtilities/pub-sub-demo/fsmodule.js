// const fs = require('fs');
const fs = require('fs/promises');

// Sync
// let text = fs.readFileSync('./index.html', 'utf-8');
// console.log(text);

// Async
// fs.readFile('./index.html', 'utf-8', (err, text) => {
//     if (err) {
//         return;
//     }

//     console.log(text);
// })

// Promise
// fs.readFile('./index.html', 'utf-8')
//     .then(text => {
//         console.log(text);
//     });

// Async function
async function readFile(path) {
    let text = await fs.readFile(path, 'utf-8');

    console.log(text);
}

readFile('./index.html');

console.log('END');