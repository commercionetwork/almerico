import randomDataGenerator from '../../__mocks__/utils';

const mockUnbonding = () => {
  const amount = randomDataGenerator.intFromInterval(1000000000, 9999999999);
  const item = {
    delegator_address: 'comnet1kh6t59n32pnj43ptqmtn6wdwclmxsfv8v94pkw',
    validator_address: 'comnetvaloper17d5g4e5q42k6e07klet4gpm0dxlja2mth3h8wl',
    entries: [
      {
        creation_height: randomDataGenerator.intFromInterval(1, 999).toString(),
        completion_time: new Date(),
        initial_balance: amount.toString(),
        balance: amount.toString(),
      },
    ],
  };
  return item;
};

const mockUnbondings = (unbondings = 5) => {
  const list = new Array(unbondings).fill(null).map(() => mockUnbonding());
  return list;
};

export { mockUnbonding, mockUnbondings };
