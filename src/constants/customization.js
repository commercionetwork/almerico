export const CUSTOMIZATION = {
  VALIDATORS: {
    BLOCKS_MONITOR: {
      VISIBILITY:
        process.env.VUE_APP_BLOCKS_MONITOR !== undefined
          ? process.env.VUE_APP_BLOCKS_MONITOR === 'true'
          : false,
      AMOUNT: 100,
    },
  },
  TXS: {
    DASHBOARD_ITEMS: 10,
    ACCOUNT_ITEMS: 10,
    TABLE_ITEMS: 25,
  },
};

export const OVERVIEW = {
  ROW_STYLE: {
    COMING_SOON: 'coming-soon',
    HIGHLIGHTED: 'highlighted',
    REGULAR: 'regular',
  },
};