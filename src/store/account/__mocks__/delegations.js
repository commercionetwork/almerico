const mockDelegation = () => {
  const item = {
    delegator_address: 'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha',
    validator_address: 'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
    shares: '100.000000000000000000',
    balance: {
      denom: 'ucommercio',
      amount: '100',
    },
  };
  return item;
};

const mockDelegations = (delegations = 5) => {
  const list = new Array(delegations).fill(null).map(() => mockDelegation());
  return list;
};

export { mockDelegation, mockDelegations };
