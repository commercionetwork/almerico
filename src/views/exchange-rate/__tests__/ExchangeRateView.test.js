import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ExchangeRateView from '../ExchangeRateView.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/exchange-rate/ExchangeRateView.vue', () => {
  const actions = {
    initExchangeRate: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      exchangeRate: {
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
    abrTokens: () => [{ id: 1 }],
    accounts: () => [{ id: 1 }],
    freezedTokens: () => ({ id: 1 }),
    params: () => ({ id: 1 }),
    pool: () => ({ id: 1 }),
    supply: () => [{ id: 1 }],
    vbrTokens: () => [{ id: 1 }],
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ExchangeRateView, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(ExchangeRateView, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ExchangeRateView, {
      localVue,
      mocks,
      data() {
        return {
          model: {
            exchangeRate: 0,
          },
        };
      },
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
