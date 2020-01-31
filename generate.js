const fs = require('fs');
const prefix = 'img/gen1i';

const mainfest = {
  images: fs.readdirSync(prefix).map(fileName => `${prefix}/${fileName}`)
};

fs.writeFileSync('./manifest.json', JSON.stringify(mainfest), { flags: 'w' });
