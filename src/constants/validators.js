export const VALIDATORS = {
  CUSTOMIZATION: {
    BLOCKS_MONITOR: {
      VISIBILITY:
        process.env.VUE_APP_BLOCKS_MONITOR !== undefined
          ? process.env.VUE_APP_BLOCKS_MONITOR === 'true'
          : false,
      AMOUNT: 100,
    },
  },
  STATUS: {
    BONDED: 'BOND_STATUS_BONDED',
    UNBONDED: 'BOND_STATUS_UNBONDED',
    UNBONDING: 'BOND_STATUS_UNBONDING',
  },
  FILTER: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BOOKMARK: 'bookmark',
  },
  STAKING_ACTIONS: [
    { id: 1, text: 'Delegate', value: 'delegate' },
    { id: 2, text: 'Redelegate', value: 'redelegate' },
    { id: 3, text: 'Undelegate', value: 'undelegate' },
  ],
};
