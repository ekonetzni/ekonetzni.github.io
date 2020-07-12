const fs = require('fs');

// Gives us the timestamp at index 1
// Gives us the name at index 2.
const regex = /([0-9]{10}\.[0-9]{1,})-(.*)\..*\.[a-z0-9]*$/;

const prefixes = ['img/gen1i', 'img/faces'];

const _date = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${d.getFullYear()}`;
};

// probably pretty slow
const sortByMtime = (a, b) => {
  const atime = fs.statSync(a).mtime.getTime();
  const btime = fs.statSync(b).mtime.getTime();
  return atime - btime;
};

const mapFileNameToImageData = prefix => fileName => {
  const tags = regex.exec(fileName);

  return {
    url: `${prefix}/${fileName}`,
    title: tags[2],
    date: _date(tags[1]),
  };
};

const addIndex = (image, index) => ({
  ...image,
  index,
});

const reducePrefixes = (acc, prefix) => [
  ...acc,
  ...fs.readdirSync(prefix).map(mapFileNameToImageData(prefix)),
];

const generate = () => {
  const images = prefixes
    .sort(sortByMtime)
    .reduce(reducePrefixes, [])
    .map(addIndex);

  fs.writeFileSync('./manifest.json', JSON.stringify({ images }), {
    flags: 'w',
  });
};

generate();
