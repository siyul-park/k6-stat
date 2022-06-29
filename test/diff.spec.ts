import * as util from 'util';
import * as path from 'path';
import { readFile } from 'jsonfile';

import { diff, Summary } from '../lib';

test('diff', async () => {
  const sample1 = await util.promisify(readFile)(path.join(__dirname, './sample1.json'));
  const sample2 = await util.promisify(readFile)(path.join(__dirname, './sample2.json'));

  const expected = await util.promisify(readFile)(path.join(__dirname, './sample-diff.json'));
  const actual = diff(sample1 as Summary, sample2 as Summary);

  expect(actual).toEqual(expected);
});