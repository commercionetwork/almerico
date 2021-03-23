const mockValidator = () => {
  const item = {
    operator_address: 'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
    consensus_pubkey:
      'did:com:valconspub1zcjduepqn2d6zy6a7ldp0wm33mnzr628qfx3zfcfucnkrmc7qslhnmx7l56secvyvw',
    jailed: false,
    status: 2,
    tokens: '150060900000',
    delegator_shares: '150060900000.000000000000000000',
    description: {
      moniker: 'adam',
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
      update_time: '2020-05-06T13:45:00Z',
    },
    min_self_delegation: '1',
    delegations: [
      {
        delegator_address: 'did:com:1yq5z4236gmcuus2t940spppwzz8uggpj5ty7ha',
        validator_address:
          'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
        shares: '50000000000.000000000000000000',
        balance: {
          denom: 'ucommercio',
          amount: '50000000000',
        },
      },
      {
        delegator_address: 'did:com:1t5fz439f49zv39pmh73c2lvuhwfzqj0ze3kzj2',
        validator_address:
          'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
        shares: '100000000000.000000000000000000',
        balance: {
          denom: 'ucommercio',
          amount: '100000000000',
        },
      },
    ],
  };
  return item;
};

const mockValidators = (validators = 4) => {
  const list = new Array(validators).fill(null).map(() => mockValidator());
  return list;
};

export { mockValidator, mockValidators };
