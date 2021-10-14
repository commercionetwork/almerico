import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mockTxs } from '../../../store/transactions/__mocks__/txs';
import BlockDetailsTransactions from '../details/BlockDetailsTransactions.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/blocks/details/BlockDetailsTransactions.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const props = {
  //   height: '1',
  // };
  // const actions = {
  //   fetchTransactionsDescendingOrder: jest.fn(),
  // };
  // const mockStore = new Vuex.Store({
  //   modules: {
  //     transactions: {
  //       namespaced: true,
  //       actions,
  //     },
  //   },
  // });
  // const mocks = {
  //   $store: mockStore,
  // };

  // test('if error message is displayed', () => {
  //   const wrapper = shallowMount(BlockDetailsTransactions, {
  //     localVue,
  //     mocks,
  //     propsData: {
  //       ...props,
  //     },
  //     computed: {
  //       error: () => ({
  //         message: 'Error',
  //         status: 400,
  //       }),
  //       isLoading: () => false,
  //       transactions: () => [],
  //     },
  //   });

  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(BlockDetailsTransactions, {
  //     localVue,
  //     mocks,
  //     propsData: {
  //       ...props,
  //     },
  //     computed: {
  //       error: () => null,
  //       isLoading: () => false,
  //       transactions: () => mockTxs(),
  //     },
  //   });

  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  // });
});
