/**
 * URL
 */
const URL = (process.env.VUE_APP_WS !== undefined) ?
  process.env.VUE_APP_WS :
  "";

/**
 * Events
 */
const EVENTS = {
  NEW_BLOCK: "NewBlock",
  TX: "Tx",
  VALIDATOR_SET_UPDATES: "ValidatorSetUpdates",
};

/**
 * WS
 */
export const WS = {
  EVENTS,
  URL,
};