import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Account from '../index.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/account/Account.vue', () => {
  const actions = {
    initAccount: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      account: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
    $t: (msg) => msg,
  };
  const computed = {
    address: () => 'address',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(Account, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(Account, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
