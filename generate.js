const fs = require('fs');

// Gives us the timestamp at index 1
// Gives us the name at index 2.
const regex = /([0-9]{10}\.[0-9]{1,})-(.*)\..*\.[a-z0-9]*$/;

const prefixes = ['img/gen1i'];

const _date = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${d.getFullYear()}`;
};

const images = prefixes.reduce((acc, prefix) => {
  return [
    ...acc,
    ...fs.readdirSync(prefix).map(fileName => {
      const tags = regex.exec(fileName);

      return {
        url: `${prefix}/${fileName}`,
        title: tags[2],
        date: _date(tags[1])
      };
    })];
}, []);

const mainfest = {
  images
};

fs.writeFileSync('./manifest.json', JSON.stringify(mainfest), { flags: 'w' });
