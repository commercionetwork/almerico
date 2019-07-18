const mockUnbonding = (balance) => {
  let item = {
    delegator_address: "comnet1kh6t59n32pnj43ptqmtn6wdwclmxsfv8v94pkw",
    validator_address: "comnetvaloper17d5g4e5q42k6e07klet4gpm0dxlja2mth3h8wl",
    entries: [{
      creation_height: "123456",
      completion_time: new Date(),
      initial_balance: `${balance}0000000`,
      balance: `${balance}0000000`
    }]
  };
  return item;
};

const mockUnbondings = (unbondings = 10) => {
  let counter = 1;
  let list = new Array(unbondings).fill(null).map(() => {
    return mockUnbonding(counter++);
  });
  return list;
};

export {
  mockUnbonding,
  mockUnbondings
};
