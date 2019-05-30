// https://github.com/angular-in-action/api/blob/master/index.js

// is this the right way to path to require ?
const parse = require('csv-parse/lib/sync');
const fs = require('fs');

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

let defaultResultCount = 10;
const loadSymbols = function (rows = defaultResultCount) {

    // TODO: use async version of read file and clean up below
    let csv = fs.readFileSync('./data/nasdaq.csv', 'utf8');
    let stocks = [];
    stocks = parse(csv, {columns: true}).map(stock => {
      let current = getRandomInt(5100, 80000) / 100;
      let change = getRandomInt(-1000, 1000) / 100;
      return {
        symbol: stock.Symbol,
        name: stock.Name,
        price: current,
        change: change
      };
    });
    return stocks.slice(1, rows);
}

module.exports = loadSymbols;