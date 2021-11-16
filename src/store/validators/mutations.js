export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setBlocks(state, payload) {
    state.blocks = payload;
  },
  addBlock(state, payload) {
    state.blocks.push(payload);
  },
  setNewHeight(state, payload) {
    state.newHeight = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
  setPool(state, payload) {
    state.pool = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  setDelegations(state, payload) {
    state.delegations = payload;
  },
};
