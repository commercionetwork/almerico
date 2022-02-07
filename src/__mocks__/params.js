const mockParams = (rate = '1.000000000000000000', period = '1000000s') => {
  const item = {
    params: {
      conversion_rate: rate,
      freeze_period: period,
    },
  };
  return item;
};

export { mockParams };
