import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AssetsViewList from '../AssetsViewList.vue';

const localVue = createLocalVue();

describe('views/assets/AssetsViewList.vue', () => {
  const actions = {
    initAssetsList: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      assetsList: {
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
    wallet: () => 'wallet',
  };

  test('if loading indicator is displayed', async () => {
    const wrapper = shallowMount(AssetsViewList, {
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

  test('if message error is displayed', async () => {
    const error = Error('message');
    const wrapper = shallowMount(AssetsViewList, {
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

  test('if content is displayed', async () => {
    const wrapper = shallowMount(AssetsViewList, {
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
