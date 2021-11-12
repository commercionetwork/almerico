const mockUnbonding = () => {
  const item = {
    delegator_address: 'did:com:1t5fz439f49zv39pmh73c2lvuhwfzqj0ze3kzj2',
    validator_address: 'did:com:valoper154xssuad424hc076aygm9y77nfjj70sr7e7lcs',
    entries: [
      {
        creation_height: '45897',
        completion_time: '2021-03-01T14:00:51.273405543Z',
        initial_balance: '100',
        balance: '100',
      },
    ],
  };
  return item;
};

const mockUnbondings = (unbondings = 5) => {
  const list = new Array(unbondings).fill(null).map(() => mockUnbonding());
  return list;
};

export { mockUnbonding, mockUnbondings };
