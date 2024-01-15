const mockReward = () => {
  const item = {
    denom: 'ucommercio',
    amount: '100.000000000000000000',
  };
  return item;
};

const mockTotal = (total = 1) => {
  const list = new Array(total).fill(null).map(() => mockReward());
  return list;
};

const mockRewards = (rewards = 5) => {
  const list = new Array(rewards).fill(null).map(() => {
    return {
      rewards: [
        {
          validator_address:
            'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
          reward: [mockReward()],
        },
      ],
      total: mockTotal(),
    };
  });
  return list;
};

export { mockRewards };
