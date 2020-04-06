/**
 * URL
 */
export const WS = (process.env.VUE_APP_WS !== undefined) ?
  process.env.VUE_APP_WS :
  "";

/**
 * Events
 */
export const EVENTS = {
  NEW_BLOCK: {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "id": 0,
    "params": {
      "query": "tm.event='NewBlock'"
    }
  }
};