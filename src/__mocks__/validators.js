const mockValidator = () => {
  const item = {
    operator_address: 'did:com:valoper18h03de6awcjk4u9gaz8s5l0xxl8ulxjcgpfzx7',
    consensus_pubkey: {
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key: 'ET6Pifwl3+X/XCHaThqJLGG7MSX9ybXZNPLvxgIehCg=',
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
      update_time: '2021-11-15T06:47:35.422606967Z',
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
