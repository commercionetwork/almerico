import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import accountBalance from './account-balance';
import application from './application';
import assetsDetail from './assets/detail';
import assetsIbc from './assets/ibc';
import assetsList from './assets/list';
import assetsNew from './assets/new';
import blocks from './blocks';
import dex from './dex';
import exchangeRate from './exchange-rate';
import home from './home';
import keplr from './keplr';
import poolsDetail from './pools/detail';
import poolsList from './pools/list';
import proposals from './proposals';
import stats from './stats';
import transactions from './transactions';
import validators from './validators';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    account,
    accountBalance,
    application,
    assetsDetail,
    assetsIbc,
    assetsList,
    assetsNew,
    blocks,
    dex,
    exchangeRate,
    home,
    keplr,
    poolsDetail,
    poolsList,
    proposals,
    stats,
    transactions,
    validators,
  },
});
