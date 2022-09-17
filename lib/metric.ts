type Metric = {
  type: string;
  contains: string;
  values: Record<string, number>;
};

export default Metric;
