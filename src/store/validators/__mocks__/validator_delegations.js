const mockValidatorDelegation = () => {
  const item = {
    delegator_address: 'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha',
    validator_address: 'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
    shares: '50000000000.000000000000000000',
    balance: {
      denom: 'ucommercio',
      amount: '50000000000',
    },
  };
  return item;
};

const mockValidatorDelegations = (delegations = 5) => {
  const list = new Array(delegations)
    .fill(null)
    .map(() => mockValidatorDelegation());
  return list;
};

export { mockValidatorDelegation, mockValidatorDelegations };
