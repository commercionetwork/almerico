export default {
  async initDexList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchContracts')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchContracts({ commit, dispatch }) {},
};
