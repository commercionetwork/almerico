import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mockTx } from '../../../store/transactions/__mocks__/txs';
import TransactionDetails from '../details/index.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/transactions/details/index.vue', () => {
  const actions = {
    fetchTransaction: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      transactions: {
        namespaced: true,
        actions,
      },
    },
  });

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        details: () => null,
        error: () => null,
        hash: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if not found message is displayed', () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        details: () => null,
        error: () => ({
          message: 'Not Found',
          status: 404,
        }),
        hash: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if error message is displayed', () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        details: () => null,
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        hash: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        details: () => ({
          data: mockTx(),
          ledger: 'ledger',
          version: '',
        }),
        error: () => null,
        hash: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
