const uniqid = require('uniqid');
const url = require('url');

const utils = require('./utils');
// import utils from "./utils.js";

console.log('Hello World!');

console.log(uniqid());
console.log(uniqid());
console.log(uniqid());

console.log(utils.calc(12, 10));
console.log(utils.div(20, 10));

let linkdinUrl = 'https://www.linkedin.com/';

let parsedUrl = url.parse(linkdinUrl);

console.log(parsedUrl);