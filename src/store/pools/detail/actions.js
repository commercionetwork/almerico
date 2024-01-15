import { bank, cosmwasm } from '@/apis/http';
import { CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initPoolsDetail({ commit, dispatch, rootGetters }, address) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const requests = [dispatch('fetchContract', address)];
    await Promise.all(requests);
    commit('setLoading', false);
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
      const requests = [dispatch('setLpInfo', { data, spender: address })];
      const native = CONTRACT.TOKEN.TYPE.NATIVE;
      const token1 = CONTRACT.TOKEN.DENOM.TOKEN_1;
      const token2 = CONTRACT.TOKEN.DENOM.TOKEN_2;
      if (data[`${token1}_denom`][native]) {
        requests.push(dispatch('getNativeToken', { denom: token1, data }));
      } else {
        requests.push(
          dispatch('getCW20Token', { denom: token1, data, spender: address })
        );
      }
      if (data[`${token2}_denom`][native]) {
        requests.push(dispatch('getNativeToken', { denom: token2, data }));
      } else {
        requests.push(
          dispatch('getCW20Token', { denom: token2, data, spender: address })
        );
      }
      await Promise.all(requests);
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
  async getNativeToken({ commit, dispatch }, { denom, data }) {
    const name = data[`${denom}_denom`][CONTRACT.TOKEN.TYPE.NATIVE];
    const balances = await dispatch('getBalances');
    const value = {
      id: name,
      denom: name.substring(1),
      reserve: data[`${denom}_reserve`],
      type: CONTRACT.TOKEN.TYPE.NATIVE,
    };
    const index = balances.findIndex((balance) => balance.denom === name);
    if (index > -1) {
      value['balance'] = balances[index]['amount'];
      value['decimals'] = 6;
    }
    commit('setContractProp', { path: denom, value });
  },
  async getBalances({ commit, rootGetters }) {
    const wallet = rootGetters['keplr/wallet'];
    try {
      const response = await bank.requestBalances(wallet);
      return response.data.balances;
    } catch (error) {
      commit('setError', error);
    }
  },
  async getCW20Token(
    { commit, dispatch, rootGetters },
    { denom, data, spender }
  ) {
    const value = {
      reserve: data[`${denom}_reserve`],
      type: CONTRACT.TOKEN.TYPE.CW20,
    };
    const contract = data[`${denom}_denom`][CONTRACT.TOKEN.TYPE.CW20];
    const owner = rootGetters['keplr/wallet'];
    const requests = [
      dispatch('getContractInfo', { contract, owner }),
      dispatch('getContractAllowance', {
        contract,
        owner,
        spender,
      }),
    ];
    const responses = await Promise.all(requests);
    value['id'] = contract;
    value['denom'] = responses[0][CONTRACT.KEY.STATE.TOKEN_INFO]['name'];
    value['decimals'] = responses[0][CONTRACT.KEY.STATE.TOKEN_INFO]['decimals'];
    value['balance'] = responses[0][CONTRACT.KEY.STATE.BALANCE];
    value['allowance'] = responses[1]['allowance'];
    commit('setContractProp', { path: denom, value });
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
