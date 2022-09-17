import arg from 'arg';
import * as util from 'util';
import jsonfile, { Path } from 'jsonfile';

import { textSummary } from './k6-jslib-summary/text';
import diff from './diff';
import Summary from './summary';

const args = arg({
  '--out': String,
});

const files = args._;
const output = args['--out'];

(async () => {
  const x = (await util.promisify(jsonfile.readFile)(files[0])) as Summary;
  const y = (await util.promisify(jsonfile.readFile)(files[1])) as Summary;

  const difference = diff(x, y);

  if (output != null) {
    await (
      util.promisify(jsonfile.writeFile) as (
        file: Path,
        obj: unknown,
      ) => Promise<void>
    )(output, difference);
  }

  console.log(textSummary(difference));
})();
