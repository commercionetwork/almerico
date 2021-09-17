import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ExchangeRate from '../index.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('views/exchange-rate/index', () => {
  const actions = {
    initSpreadsheet: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      spreadsheet: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
  };
  const computed = {
    abrTokens: () => [],
    accountsTokens: () => [],
    allTokens: () => [],
    freezedTokens: () => [],
    vbrTokens: () => [],
    params: () => ({}),
    pool: () => ({}),
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ExchangeRate, {
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

  test('if error message is displayed', () => {
    const wrapper = shallowMount(ExchangeRate, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => ({
          data: {
            message: 'Error',
            status: 400,
          },
        }),
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ExchangeRate, {
      localVue,
      mocks,
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
