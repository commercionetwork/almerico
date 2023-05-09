import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '../App.vue';

const localVue = createLocalVue();

describe('App.vue', () => {
  const actions = {
    initAppData: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      application: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
  };
  const computed = {
    style: () => ({ background: '#fff' }),
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(App, {
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
    const wrapper = shallowMount(App, {
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
    const wrapper = shallowMount(App, {
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

jest.mock('../apis/ws/wsBackendClient.js', () => ({
  get: () => jest.fn(),
}));

jest.mock('../apis/ws/wsChainClient.js', () => ({
  get: () => jest.fn(),
}));
