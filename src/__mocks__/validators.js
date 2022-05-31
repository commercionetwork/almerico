import { VALIDATORS } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

const mockValidatorBackend = (rank = 1, active = true) => {
  const item = {
    id: uuidv4(),
    operatorAddress: 'did:com:valoper1mfddzjvr8vpeqdtm6fuay2nvnecuk9qaylfxd8',
    account: 'did:com:1mfddzjvr8vpeqdtm6fuay2nvnecuk9qa8usqq5',
    pubkey: 'Fr03KpOeregR9AGDWf/ikalGXC6U1cUoXJPLPb5ezNY=',
    active,
    rank,
    tokens: 100000000,
    commission: '0.100000000000000000',
    moniker: 'mock-moniker',
    logo: '',
    identity: '',
    website: '',
    securityContact: '',
    details: '',
    updateTime: '2020-01-01T00:00:00Z',
    power: 0.1,
    cumulative: 0.1,
    attendance: 1,
    createdAt: '2022-01-01T00:00:00Z',
    updatedAt: '2022-01-01T00:00:00Z',
  };
  return item;
};

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
      identity: '05a60760b68d702a',
      website: 'http://site.eu',
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

const mockValidatorLogo = () => {
  const item = {
    status: {
      code: 0,
      name: 'OK',
    },
    them: [
      {
        id: '2305a60760b68d702afd6ae423185419',
        pictures: {
          primary: {
            url: 'https://s3.amazonaws.com/keybase_processed_uploads/300.jpg',
            source: null,
          },
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

const mockValidatorsBackend = (validators = 4) => {
  let rank = 1;
  const list = new Array(validators)
    .fill(null)
    .map(() => mockValidatorBackend(rank++));
  return list;
};

export {
  mockValidator,
  mockValidatorBackend,
  mockValidatorLogo,
  mockValidators,
  mockValidatorsBackend,
};
