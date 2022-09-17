import Options from './options';
import State from './state';
import Group from './group';
import Metric from './metric';

type Summary = {
  options: Options;
  state: State;
  root_group: Group;
  metrics: Record<string, Metric>;
};

export default Summary;
