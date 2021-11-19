import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import HomeGridListComponent from '../HomeGridListComponent.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/home/HomeGridListComponent.vue', () => {
  const actions = {
    refreshTransactions: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      home: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
  };
  const computed = {
    transactions: () => [],
    txEventHeight: () => 'txEventHeight',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(HomeGridListComponent, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isRefreshing: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(HomeGridListComponent, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isRefreshing: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
