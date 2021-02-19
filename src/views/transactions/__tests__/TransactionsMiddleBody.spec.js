import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mockTxs } from '../../../store/transactions/__mocks__/txs';
import TransactionsMiddleBody from '../dashboard/TransactionsMiddleBody.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/transactions/dashboard/TransactionsMiddleBody.vue', () => {
  const actions = {
    changePage: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      transactions: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
  };
  const computed = {
    items: () => [],
    filter: () => '',
  };

  test('if error message is displayed', () => {
    const wrapper = shallowMount(TransactionsMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(TransactionsMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        transactions: () => mockTxs(),
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  });

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(TransactionsMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => true,
        transactions: () => mockTxs(),
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  });
});
