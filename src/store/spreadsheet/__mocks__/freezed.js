const mockFreezed = () => {
  const item = {
    type: 'cosmos-sdk/ModuleAccount',
    value: {
      address: 'did:com:1lhk7zyhvzn07zw48ydyh6fq0unwnv64xguvtlk',
      coins: [{ denom: 'ucommercio', amount: '10000000000' }],
      public_key: '',
      account_number: '17',
      sequence: '0',
      name: 'commerciomint',
      permissions: ['minter', 'burner'],
    },
  };
  return item;
};

export { mockFreezed };
