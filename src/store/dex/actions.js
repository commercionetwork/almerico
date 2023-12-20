import { bank, cosmwasm } from '@/apis/http';
import { CONFIG, CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDex({ commit, dispatch, rootGetters }) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const requests = [dispatch('fetchContracts')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchContracts({ commit, dispatch }) {
    const addresses = await dispatch('getContracts');
    for (const address of addresses) {
      const models = await dispatch('getContractModels', address);
      const token1 = await dispatch('getToken', {
        key: CONTRACT.KEY.STATE.TOKEN_1,
        models,
      });
      const token2 = await dispatch('getToken', {
        key: CONTRACT.KEY.STATE.TOKEN_2,
        models,
      });
      const contract = { id: address, token1, token2 };
      commit('addContract', contract);
    }
  },
  async getContracts({ commit }) {
    const contracts = [];
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts({
          codeId: CONFIG.WASM_SWAP_CODE_ID,
          nextKey,
        });
        contracts.push(...response.data.contracts);
        nextKey = response.data.pagination.next_key;
      } catch (error) {
        commit('setError', error);
      }
    } while (nextKey);
    return contracts;
  },
  async getContractModels({ commit }, address) {
    try {
      const response = await cosmwasm.requestContractState(address);
      return response.data.models;
    } catch (error) {
      commit('setError', error);
    }
  },
  async getToken({ commit, dispatch }, { key, models }) {
    const index = getIndexByKey(models, key);
    if (index < 0) {
      return '';
    }
    const token = JSON.parse(
      stringEncoder.decodeFromBase64(models[index].value)
    );
    if (token['denom'][CONTRACT.TOKEN.TYPE.NATIVE]) {
      return token['denom'][CONTRACT.TOKEN.TYPE.NATIVE];
    }
    try {
      const address = token['denom'][CONTRACT.TOKEN.TYPE.CW20];
      const cw20Models = await dispatch('getContractModels', address);
      const cw20Index = getIndexByKey(
        cw20Models,
        CONTRACT.KEY.STATE.TOKEN_INFO
      );
      if (cw20Index < 0) {
        return address;
      }
      const cw20 = JSON.parse(
        stringEncoder.decodeFromBase64(cw20Models[cw20Index].value)
      );
      return cw20.name;
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchDex({ commit, dispatch }, address) {
    commit('setHandling', true);
    const requests = [dispatch('getDexDetail', address)];
    await Promise.all(requests);
    commit('setHandling', false);
  },
  async getDexDetail({ commit, dispatch }, address) {
    const query = '{"info":{}}';
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      commit('setDexProp', { path: 'id', value: address });
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
    commit('setDexProp', { path: 'lp', value });
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
    commit('setDexProp', { path: denom, value });
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
    commit('setDexProp', { path: denom, value });
  },
};

const getIndexByKey = (items, key) =>
  items.findIndex(
    (item) =>
      item.key.toUpperCase() === stringEncoder.encodeToHex(key).toUpperCase()
  );
