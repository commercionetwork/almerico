const mockBalance = () => {
  const item = {
    denom: 'ucommercio',
    amount: '100',
  };
  return item;
};

const mockBalances = (balances = 1) => {
  const list = new Array(balances).fill(null).map(() => mockBalance());
  return list;
};

export { mockBalance, mockBalances };
