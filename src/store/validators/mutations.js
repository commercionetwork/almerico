export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setBlocks(state, payload) {
    state.blocks = payload;
  },
  addSingleBlock(state, payload) {
    state.blocks.push(payload);
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
