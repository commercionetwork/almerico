export default {
  async initDex({ commit, dispatch, rootGetters }) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const requests = [];
    await Promise.all(requests);
    commit('setLoading', false);
  },
};
