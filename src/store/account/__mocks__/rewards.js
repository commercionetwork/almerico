const mockRewards = () => {
  const item = {
    rewards: [
      {
        validator_address:
          'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
        reward: [
          {
            denom: 'ucommercio',
            amount: '1846410.900000000000000000',
          },
        ],
      },
    ],
    total: [
      {
        denom: 'ucommercio',
        amount: '1846410.900000000000000000',
      },
    ],
  };
  return item;
};

export { mockRewards };
