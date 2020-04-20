const mockDelegation = (shares) => {
  const item = {
    delegator_address: "comnet17d5g4e5q42k6e07klet4gpm0dxlja2mtjh9qdf",
    validator_address: "comnetvaloper17d5g4e5q42k6e07klet4gpm0dxlja2mth3h8wl",
    shares: `${shares}000.000000000000000000`,
    balance: {
      denom: "ucommercio",
      amount: `${shares}000`
    }
  };
  return item;
};

const mockDelegations = (delegations = 10) => {
  let counter = 1;
  let list = new Array(delegations).fill(null).map(() => {
    return mockDelegation(counter++);
  });
  return list;
};

export {
  mockDelegation,
  mockDelegations
};
