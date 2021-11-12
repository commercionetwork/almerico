const mockValidator = () => {
  const item = {
    operator_address: 'did:com:valoper154xssuad424hc076aygm9y77nfjj70sr7e7lcs',
    consensus_pubkey: {
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key: 'M096WOlaKj3fzov2FnpjMRgB1H90vyTxIgnDh6j86Yg=',
    },
    jailed: false,
    status: 'BOND_STATUS_BONDED',
    tokens: '100000000',
    delegator_shares: '100000000.000000000000000000',
    description: {
      moniker: 'mynode',
      identity: '',
      website: '',
      security_contact: '',
      details: '',
    },
    unbonding_height: '0',
    unbonding_time: '1970-01-01T00:00:00Z',
    commission: {
      commission_rates: {
        rate: '0.100000000000000000',
        max_rate: '0.200000000000000000',
        max_change_rate: '0.010000000000000000',
      },
      update_time: '2021-11-04T09:52:26.953491822Z',
    },
    min_self_delegation: '1',
  };
  return item;
};

const mockValidators = (validators = 4) => {
  const list = new Array(validators).fill(null).map(() => mockValidator());
  return list;
};

export { mockValidator, mockValidators };
