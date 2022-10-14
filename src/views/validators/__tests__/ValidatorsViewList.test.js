import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ValidatorsViewList from '../ValidatorsViewList.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/validators/ValidatorsViewList.vue', () => {
  const actions = {
    initValidatorsList: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      validators: {
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
    eventHeight: () => ({ hegiht: '1', hasTxs: false }),
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => true,
        isInitialized: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="wallet-summary"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(ValidatorsViewList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => error,
        isLoading: () => false,
        isInitialized: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="wallet-summary"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        isInitialized: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="wallet-summary"]').exists()).toBe(false);
  });

  test('if wallet is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        isInitialized: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="wallet-summary"]').exists()).toBe(true);
  });
});
