const CUSTOMIZATION = Object.freeze({
  BLOCKS_MONITOR: {
    AMOUNT: 100,
  },
});

const FILTER = Object.freeze({
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BOOKMARK: 'bookmark',
});

const STAKING_ACTIONS = Object.freeze([
  { id: 1, text: 'Delegate', value: 'delegate' },
  { id: 2, text: 'Redelegate', value: 'redelegate' },
  { id: 3, text: 'Undelegate', value: 'undelegate' },
]);

const STATUS = Object.freeze({
  BONDED: 'BOND_STATUS_BONDED',
  UNBONDED: 'BOND_STATUS_UNBONDED',
  UNBONDING: 'BOND_STATUS_UNBONDING',
});

export default Object.freeze({
  CUSTOMIZATION,
  FILTER,
  STAKING_ACTIONS,
  STATUS,
});
