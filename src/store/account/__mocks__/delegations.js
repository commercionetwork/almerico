import randomDataGenerator from '../../__mocks__/utils';

const mockDelegation = () => {
  const amount = randomDataGenerator.intFromInterval(1000000000, 9999999999);
  const item = {
    delegator_address: 'comnet17d5g4e5q42k6e07klet4gpm0dxlja2mtjh9qdf',
    validator_address: 'comnetvaloper17d5g4e5q42k6e07klet4gpm0dxlja2mth3h8wl',
    shares: `${amount}.000000000000000000`,
    balance: {
      denom: 'ucommercio',
      amount: amount.toString(),
    },
  };
  return item;
};

const mockDelegations = (delegations = 5) => {
  const list = new Array(delegations).fill(null).map(() => mockDelegation());
  return list;
};

export { mockDelegation, mockDelegations };
