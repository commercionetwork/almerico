import { governance, proposals, staking } from '@/apis/http';
import { CONFIG, PROPOSALS } from '@/constants';
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';

export default {
  async initProposalsList({ commit, dispatch }, status) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchProposals', status)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposals({ commit }, status = PROPOSALS.STATUS.UNSPECIFIED) {
    try {
      const response = await proposals.requestList(status);
      commit('setList', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  filterProposals({ commit }, filter) {
    commit('setFilter', filter);
  },

  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchPool'),
      dispatch('fetchProposalDetail', id),
      dispatch('fetchProposalTally', id),
      dispatch('fetchProposalVotesLegacy', id),
      dispatch('fetchTallyParams'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchPool({ commit }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalDetail({ commit }, id) {
    try {
      const response = await proposals.requestDetail(id);
      commit('setDetail', { proposal: response.data });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalTally({ commit }, id) {
    try {
      const response = await governance.requestTally(id);
      commit('setDetail', { tally: response.data.tally });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalVotes({ commit }, id) {
    try {
      const response = await governance.requestVotes(id);
      commit('setDetail', { votes: response.data.votes });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchTallyParams({ commit }) {
    try {
      const response = await governance.requestTallyParams();
      commit('setTallyParams', response.data.tally_params);
    } catch (error) {
      commit('setError', error);
    }
  },
  async voteProposal(
    { commit, dispatch, rootGetters },
    { voteOption, proposalId, translator, context }
  ) {
    commit('setLoading', true);
    const isKeplrInitialized = rootGetters['keplr/isInitialized'];
    if (!isKeplrInitialized) {
      await dispatch('keplr/connect', { translator, context }, { root: true });
    }
    try {
      const chain = CONFIG.CHAIN.LIST.find(
        (item) => item.lcd === process.env.VUE_APP_LCD
      );
      const offlineSigner = window.keplr.getOfflineSigner(chain.chainId);
      const client = await SigningStargateClient.connectWithSigner(
        chain.rpc,
        offlineSigner
      );
      const fee = _getFee();
      const accounts = rootGetters['keplr/accounts'];
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: MsgVote.fromPartial({
          proposalId: proposalId,
          voter: accounts[0].address,
          option: voteOption,
        }),
      };
      const result = await client.signAndBroadcast(
        accounts[0].address,
        [msg],
        fee
      );
      assertIsDeliverTxSuccess(result);
    } catch (error) {
      commit('setError', error);
    }
    commit('setLoading', false);
  },
  async fetchProposalVotesLegacy({ commit }, id) {
    try {
      const response = await governance.requestVotesLegacy(id);
      commit('setDetail', { votes: response.data.result });
    } catch (error) {
      commit('setError', error);
    }
  },
};

const _getFee = () => ({
  amount: [
    {
      denom: 'ucom',
      amount: '10000',
    },
  ],
  gas: '200000',
});
