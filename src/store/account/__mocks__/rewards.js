const mockReward = (amount = 1) => {
  const item = {
    validator_address: "did:com:valoper17mphsm779jkkha32dmfy0sm8563qz3mzsl43hv",
    reward: [
      {
        denom: "ucommercio",
        amount: `${amount}000.000000000000000000`
      }
    ]
  };
  return item;
};

const mockRewards = (rewards = 1) => {
  let counter = 1;
  let total = 0;
  let list = new Array(rewards).fill(null).map(() => {
    total += counter;
    return mockReward(counter++);
  });
  return {
    list,
    total: [{
      denom: "ucommercio",
      amount: `${total}000.000000000000000000`
    }]
  };
};

export { mockReward, mockRewards };