import Summary from './summary';
import arrayUnion from './array-union';

function diff(x: Summary, y: Summary): Summary {
  const state: Summary['state'] = {
    isStdOutTTY: y.state.isStdOutTTY,
    isStdErrTTY: y.state.isStdErrTTY,
    testRunDurationMs: y.state.testRunDurationMs - x.state.testRunDurationMs,
  };
  const options: Summary['options'] = {
    noColor: y.options.noColor,
    summaryTrendStats: arrayUnion(x.options.summaryTrendStats, y.options.summaryTrendStats),
    summaryTimeUnit: y.options.summaryTimeUnit,
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const root_group: Summary['root_group'] = y.root_group; // TODO(more detail diff)
  const metrics: Summary['metrics'] = {};
  arrayUnion(Object.keys(x.metrics), Object.keys(y.metrics)).forEach((metricKey) => {
    const xValues = x.metrics[metricKey]?.values ?? {};
    const yValues = y.metrics[metricKey]?.values ?? {};

    const type = y.metrics[metricKey]?.type ?? x.metrics[metricKey]?.type ?? '';
    const contains = y.metrics[metricKey]?.contains ?? x.metrics[metricKey]?.contains ?? '';

    const values: Record<string, number> = {};
    arrayUnion(Object.keys(xValues), Object.keys(yValues)).forEach((valueKey) => {
      values[valueKey] = (yValues[valueKey] ?? 0) - (xValues[valueKey] ?? 0);
    });

    metrics[metricKey] = {
      values,
      type,
      contains,
    };
  });

  return {
    state,
    options,
    metrics,
    root_group,
  };
}

export default diff;
