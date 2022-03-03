import { VALIDATORS } from '@/constants';

const mockValidator = ({
  operator_address = 'did:com:valoper1yq5z4236gmcuus2t940spppwzz8uggpjhgac6w',
  key = 'mpuhE1332he7cY7mIelHAk0RJwnmJ2HvHgQ/eeze/TU=',
  status = VALIDATORS.STATUS.BONDED,
} = {}) => {
  const item = {
    operator_address,
    consensus_pubkey: {
      '@type': '/cosmos.crypto.ed25519.PubKey',
      key,
    },
    jailed: false,
    status,
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
