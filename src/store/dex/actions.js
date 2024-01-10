import { bank, cosmwasm } from '@/apis/http';
import { CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDex({ commit, dispatch, rootGetters }, address) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const requests = [
      dispatch('fetchBalances'),
      dispatch('fetchContract', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchBalances({ commit, rootGetters }) {
    const wallet = rootGetters['keplr/wallet'];
    try {
      const response = await bank.requestBalances(wallet);
      commit('setBalances', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchContract({ commit, dispatch }, address) {
    const query = '{"info":{}}';
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      commit('setContractProp', { path: 'id', value: address });
      const data = response.data.data;
      await dispatch('setLpInfo', { data, spender: address });
      const token1 = buildToken(data, CONTRACT.TOKEN.DENOM.TOKEN_1);
      commit('setContractProp', {
        path: CONTRACT.TOKEN.DENOM.TOKEN_1,
        value: token1,
      });
      const token2 = buildToken(data, CONTRACT.TOKEN.DENOM.TOKEN_2);
      commit('setContractProp', {
        path: CONTRACT.TOKEN.DENOM.TOKEN_2,
        value: token2,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async setLpInfo({ commit, dispatch, rootGetters }, { data, spender }) {
    const contract = data['lp_token_address'];
    const owner = rootGetters['keplr/wallet'];
    const requests = [
      dispatch('getContractInfo', { contract, owner }),
      dispatch('getContractFee', spender),
      dispatch('getContractAllowance', {
        contract,
        owner,
        spender,
      }),
    ];
    const responses = await Promise.all(requests);
    const value = {
      id: contract || '',
      balance: responses[0][CONTRACT.KEY.STATE.BALANCE] || '',
      decimals: responses[0][CONTRACT.KEY.STATE.TOKEN_INFO]['decimals'] || 6,
      supply: responses[0][CONTRACT.KEY.STATE.TOKEN_INFO]['total_supply'] || '',
      lpFeePercent: responses[1][CONTRACT.KEY.FEE.LP_FEE_PERCENT] || '',
      protocolFeePercent:
        responses[1][CONTRACT.KEY.FEE.PROTOCOL_FEE_PERCENT] || '',
      allowance: responses[2]['allowance'] || '',
    };
    commit('setContractProp', { path: 'lp', value });
  },
  async getContractInfo({ commit }, { contract, owner }) {
    try {
      const response = await cosmwasm.requestContractState(contract);
      const models = response.data.models;
      const info = {};
      const regex = new RegExp(`${CONTRACT.KEY.STATE.BALANCE}${owner}`, 'igm');
      for (const model of models) {
        const key = stringEncoder.decodeFromHex(model.key);
        if (key === CONTRACT.KEY.STATE.TOKEN_INFO) {
          info[key] = JSON.parse(stringEncoder.decodeFromBase64(model.value));
        }
        if (regex.test(key)) {
          info[CONTRACT.KEY.STATE.BALANCE] = stringEncoder.removeDoubleQuotes(
            stringEncoder.decodeFromBase64(model.value)
          );
        }
      }
      return info;
    } catch (error) {
      commit('setError', error);
    }
  },
  async getContractAllowance({ commit }, { contract, owner, spender }) {
    const query = `{"allowance":{"owner":"${owner}","spender":"${spender}"}}`;
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address: contract,
        queryData,
      });
      return response.data.data;
    } catch (error) {
      commit('setError', error);
    }
  },
  async getContractFee({ commit }, address) {
    const query = '{"fee":{}}';
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      return response.data.data;
    } catch (error) {
      commit('setError', error);
    }
  },
  async executeContract(
    { commit, dispatch, rootGetters },
    { msgs, translator, context } = {}
  ) {
    if (!rootGetters['keplr/wallet']) {
      await dispatch('keplr/connect', { translator, context }, { root: true });
    }
    commit('setHandling', true);
    const res = await dispatch('keplr/signAndBroadcastCosmWasmTx', msgs, {
      root: true,
    });
    commit('setHandling', false);
    return res;
  },
};

const buildToken = (data, denom) => {
  const name = data[`${denom}_denom`][CONTRACT.TOKEN.TYPE.NATIVE];
  return {
    denom: name,
    label: name.substring(1),
    reserve: data[`${denom}_reserve`],
  };
};
