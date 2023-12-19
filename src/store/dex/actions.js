export default {
  async initDex({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [];
    await Promise.all(requests);
    commit('setLoading', false);
  },
};
