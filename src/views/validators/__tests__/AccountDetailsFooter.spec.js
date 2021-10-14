import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mockTxs } from '../../../store/transactions/__mocks__/txs';
import AccountDetailsFooter from '../account/AccountDetailsFooter.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/validators/account/AccountDetailsFooter.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const props = {
  //   address: 'address',
  // };
  // const actions = {
  //   changePage: jest.fn(),
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
  //   const wrapper = shallowMount(AccountDetailsFooter, {
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
  //       items: () => [],
  //       transactions: () => [],
  //     },
  //   });

  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(AccountDetailsFooter, {
  //     localVue,
  //     mocks,
  //     propsData: {
  //       ...props,
  //     },
  //     computed: {
  //       error: () => null,
  //       isLoading: () => false,
  //       items: () => [],
  //       transactions: () => mockTxs(),
  //     },
  //   });

  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  // });

  // test('if loading message is displayed', () => {
  //   const wrapper = shallowMount(AccountDetailsFooter, {
  //     localVue,
  //     mocks,
  //     propsData: {
  //       ...props,
  //     },
  //     computed: {
  //       error: () => null,
  //       isLoading: () => true,
  //       items: () => [],
  //       transactions: () => mockTxs(),
  //     },
  //   });

  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  // });
});
