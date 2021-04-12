const URL = process.env.VUE_APP_WS !== undefined ? process.env.VUE_APP_WS : '';

const EVENTS = {
  NEW_BLOCK: 'NewBlock',
  TX: 'Tx',
  VALIDATOR_SET_UPDATES: 'ValidatorSetUpdates',
};

const TX_TYPES = {
  NEW_CONVERSION_RATE: 'new_conversion_rate',
};

export const WS = {
  EVENTS,
  URL,
  TX_TYPES,
};
