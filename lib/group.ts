import Check from './check';

type Group = {
  id: string;
  path: string;
  groups: Group[];
  checks: Check[];
  name: string;
};

export default Group;
