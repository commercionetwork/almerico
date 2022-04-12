import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import TransactionsViewListTable from '../TransactionsViewListTable.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('views/transactions/list/TransactionsViewListTable.vue', () => {
  const mocks = {
    $t: (msg) => msg,
  };
  const computed = {
    offset: () => '1',
    total: () => '1',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(TransactionsViewListTable, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isAddingTxs: () => false,
        isRefreshing: () => true,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="scrolling"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(TransactionsViewListTable, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isAddingTxs: () => false,
        isRefreshing: () => false,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="scrolling"]').exists()).toBe(false);
  });

  test('if scrolling indicator is displayed', () => {
    const wrapper = shallowMount(TransactionsViewListTable, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isAddingTxs: () => true,
        isRefreshing: () => false,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="scrolling"]').exists()).toBe(true);
  });
});
