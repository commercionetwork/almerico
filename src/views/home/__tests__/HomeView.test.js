import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeView from '../HomeView.vue';

const localVue = createLocalVue();

describe('views/home/HomeView.vue', () => {
  const actions = {
    initHome: jest.fn(),
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
    $t: (msg) => msg,
  };
  const computed = {
    chartEventTokens: () => ({ date: '2023-02-06T14:13:00.768Z' }),
    setParamsEventHeight: () => 'setParamsEventHeight',
    txEventHeight: () => 'txEventHeight',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(HomeView, {
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
    const wrapper = shallowMount(HomeView, {
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
    const wrapper = shallowMount(HomeView, {
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
