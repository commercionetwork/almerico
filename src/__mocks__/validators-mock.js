import { VALIDATORS } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

const mockValidatorAttendanceBackend = () => {
  const item = {
    height: 1,
    status: true,
  };
  return item;
};

const mockValidatorBackend = (isList, id = uuidv4()) => {
  const item = {
    id,
    operator_address: 'did:com:valoper133nf49v83dts7pq30csnnl7ul5unsvzzhhed8u',
    account: 'did:com:133nf49v83dts7pq30csnnl7ul5unsvzz55qt20',
    pubkey: 'tY4XIhur8QznKgnjuo3Bf+jbb5hV3KMEmm7hJq0qMis=',
    active: true,
    rank: 1,
    tokens: 100,
    commission: '0.100000000000000000',
    moniker: 'moniker',
    logo: 'https://logo.url',
    identity: '123456AB',
    website: 'https://website.url',
    details: 'details',
    security_contact: 'security contact',
    update_time: '2020-06-17T09:45:00Z',
    power: 0.25,
    cumulative: 0.25,
    attendance: 1,
    createdAt: '2022-06-07T14:37:43.420Z',
    updatedAt: '2022-06-07T14:37:43.420Z',
  };
  if (!isList) {
    item.blocks = new Array(5)
      .fill(null)
      .map(() => mockValidatorAttendanceBackend());
  }
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

const mockValidators = (validators = 4) => {
  const list = new Array(validators).fill(null).map(() => mockValidator());
  return list;
};

const mockValidatorsBackend = (validators = 4) => {
  const list = new Array(validators)
    .fill(null)
    .map(() => mockValidatorBackend(true));
  return list;
};

export {
  mockValidator,
  mockValidatorBackend,
  mockValidators,
  mockValidatorsBackend,
};
