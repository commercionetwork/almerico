import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AssetsViewNew from '../AssetsViewNew.vue';

const localVue = createLocalVue();

describe('views/assets/AssetsViewNew.vue', () => {
  const actions = {
    initAssetsNew: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      assetsNew: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
    $t: (msg) => msg,
  };

  test('if "access denied" alert is displayed', () => {
    const wrapper = shallowMount(AssetsViewNew, {
      localVue,
      mocks,
      computed: {
        isDenied: () => true,
        error: () => null,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="access-denied"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="access-not-denied"]').exists()).toBe(
      false
    );
  });

  test('if loading indicator is displayed', async () => {
    const wrapper = shallowMount(AssetsViewNew, {
      localVue,
      mocks,
      computed: {
        isDenied: () => false,
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
    const wrapper = shallowMount(AssetsViewNew, {
      localVue,
      mocks,
      computed: {
        isDenied: () => false,
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', async () => {
    const wrapper = shallowMount(AssetsViewNew, {
      localVue,
      mocks,
      computed: {
        isDenied: () => false,
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
