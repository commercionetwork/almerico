const mockSupplyItem = () => {
  const item = {
    denom: 'udenom',
    amount: '1000000',
  };
  return item;
};

const mockSupply = (items = 2) => {
  const list = new Array(items).fill(0).map(() => mockSupplyItem());
  return list;
};

export { mockSupply, mockSupplyItem };
