// common/utils.js

const utils = {};

utils.flaggedUsers = [
  1663882102141, 1663900040545, 1664485938220,
]

utils.styles = {
  car: 'gray',
  fish: 'red',
  house: 'yellow',
  tree: 'green',
  bicycle: 'cyan',
  guitar: 'blue',
  pencil: 'magenta',
  clock: 'lightgray',
};

utils.formatPercent = (n) => `${ (n * 100).toFixed(2) }%`;

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(
    count / max
  );
  process.stdout.write(
    `${count} / ${max} (${percent})`
  )
};

utils.groupBy = (objArraay, key) => {
  return objArraay.reduce((obj, item) => {
    const val = item[key];
    if (obj[val] == null) {
      obj[val] = [];
    }
    obj[val].push(item);
    return obj;
  }, {});
};

if (typeof module !== 'undefined')
  module.exports = utils;
