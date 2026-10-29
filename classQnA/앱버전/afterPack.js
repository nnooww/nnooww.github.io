'use strict';

const fs = require('node:fs');
const path = require('node:path');

exports.default = async function afterPack(context) {
  const localeDir = path.join(context.appOutDir, 'locales');
  for (const name of fs.readdirSync(localeDir)) {
    if (name !== 'en-US.pak' && name !== 'ko.pak') {
      fs.rmSync(path.join(localeDir, name));
    }
  }
};
