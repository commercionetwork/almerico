const mockDelegation = (
  delegator = 'did:com:154xssuad424hc076aygm9y77nfjj70sra68e4r',
  validator = 'did:com:valoper154xssuad424hc076aygm9y77nfjj70sr7e7lcs',
) => {
  const item = {
    delegation: {
      delegator_address: delegator,
      validator_address: validator,
      shares: '100000000.000000000000000000',
    },
    balance: {
      denom: 'ucommercio',
      amount: '100000000',
    },
  };
  return item;
};

const mockDelegations = (delegations = 5) => {
  const list = new Array(delegations).fill(null).map(() => mockDelegation());
  return list;
};

export { mockDelegation, mockDelegations };
