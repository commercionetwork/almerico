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

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(TransactionsViewListTable, {
      localVue,
      mocks,
      computed: {
        isRefreshing: () => true,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(TransactionsViewListTable, {
      localVue,
      mocks,
      computed: {
        isRefreshing: () => false,
        transactions: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
