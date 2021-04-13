const { execSync } = require('child_process');
const errors = require('./errors.json');

const escape = str => str.replace(/[\\$'"`’]/g, "\\$&");

errors.forEach(path => {
  try {
    execSync(`git rm "./${escape(path)}"`, { cwd: '.'}); 
  } catch (e) {
    console.error(e);
  }
});