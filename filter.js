const Mint = require('mint-filter').default

const fs = require('fs');
let array = fs.readFileSync(__dirname + "/words.txt").toString().split("\n");

const mint = new Mint(array)

exports.check = function (msg) {
    return mint.validator(msg);
}