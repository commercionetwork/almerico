/**
 * Tendermint mutations
 */

export default {
  /**
   * Set Tendermint isFetching state to true
   *
   * @param {TendermintState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set Tendermint isFetching state to false
   *
   * @param {TendermintState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set Tendermint message
   *
   * @param {TendermintState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set blocks data
   * 
   * @param {TendermintState} state 
   * @param {Array} data 
   */
  setBlocks(state, data) {
    state.blocks = data;
  },
  /**
   * Add blocks data
   * 
   * @param {TendermintState} state 
   * @param {Array} data 
   */
  addBlocks(state, data) {
    state.blocks.push(...data);
  },
  /**
   * Add block to blocks list
   * 
   * @param {TendermintState} state 
   * @param {Block} data 
   */
  addNewBlock(state, data) {
    const blocks = [...state.blocks];
    state.blocks.length = 0;
    state.blocks.push(data, ...blocks);
  },
  /**
   * Set last block
   * 
   * @param {TendermintState} state 
   * @param {Block} data 
   */
  setLastBlock(state, data) {
    state.lastBlock = data;
  },
  /**
   * Set transactions data
   * 
   * @param {TendermintState} state 
   * @param {Array} data 
   */
  setTransactions(state, data) {
    state.transactions = data;
  },
  /**
   * Add transactions data
   *
   * @param {TendermintState} state
   * @param {Array} data
   */
  addTransactions(state, data) {
    state.transactions.push(...data);
  },
  /**
   * Add transaction to transactions list
   * 
   * @param {TendermintState} state 
   * @param {Transaction} data 
   */
  addNewTransaction(state, data) {
    const transactions = [...state.transactions];
    state.transactions.length = 0;
    state.transactions.push(data, ...transactions);
  },
};
