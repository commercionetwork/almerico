import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ExchangeRateView from '../ExchangeRateView.vue';

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
    eventChart: () => ({ date: '2023-02-06T14:13:00.768Z' }),
    eventOverview: () => ({ date: '2023-02-06T14:13:00.757Z' }),
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
