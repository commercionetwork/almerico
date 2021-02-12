import randomDataGenerator from '../../__mocks__/utils';

const mockBalance = () => {
  const item = {
    denom: 'ucommercio',
    amount: randomDataGenerator.intFromInterval(1000000000, 9999999999).toString(),
  };
  return item;
};

const mockBalances = (balances = 1) => {
  const list = new Array(balances).fill(null).map(() => mockBalance());
  return list;
};

export { mockBalance, mockBalances };
