#!/usr/bin/env node

const util = require('util');
const arg = require('arg');
const { readFile, writeFile } = require('jsonfile');

const { textSummary } = require('./k6-jslib-summary/text');
const { diff } = require('../dist');

const args = arg({
    '--output': String,
});

const files = args['_'];
const output = args['--output'];

(async () => {
    const x = await util.promisify(readFile)(files[0]);
    const y = await util.promisify(readFile)(files[1]);

    const difference = diff(x, y);

    if (output != null) {
        await util.promisify(writeFile)(output, difference);
    }

    console.log(textSummary(difference));
})();
