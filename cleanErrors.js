const { execSync } = require('child_process');
const errors = require('./errors.json');

const strip = str => str.replace(/[\`’]/g, "'");
const escape = str => str.replace(/[\\$'"]/g, "\\$&");
const clean = str => escape(strip(str));

errors.forEach(path => execSync(`git rm "./${clean(path)}"`), { cwd: '.'});