const fs = require('fs');
const path = require('path');
const parse = require('./lang/parse');
const evaluate = require('./lang/evaluate');
const topScope = require('./lang/topScope');

const fileName = process.argv[process.argv.length - 1];

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(fs.readFileSync(path.join(__dirname, fileName), { encoding: 'utf-8' }))
