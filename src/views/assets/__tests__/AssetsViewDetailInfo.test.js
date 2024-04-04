import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AssetsViewDetailInfo from '../AssetsViewDetailInfo.vue';

const localVue = createLocalVue();

describe('views/assets/AssetsViewDetailInfo.vue', () => {
  const actions = {
    initAssetsDetail: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      assetsDetail: {
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

  test('if loading indicator is displayed', async () => {
    const wrapper = shallowMount(AssetsViewDetailInfo, {
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
    const wrapper = shallowMount(AssetsViewDetailInfo, {
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
    const wrapper = shallowMount(AssetsViewDetailInfo, {
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
