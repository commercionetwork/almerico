import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DexViewDetailDashboard from '../DexViewDetailDashboard.vue';

const localVue = createLocalVue();

describe('views/dex/DexViewDetailDashboard.vue', () => {
  const actions = {
    initDexDetail: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      dexDetail: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
    $t: (msg) => msg,
  };
  const props = {
    id: 'id',
  };
  const computed = {
    accounts: () => [{ address: 'address' }],
  };

  test('if missing wallet alert is displayed', () => {
    const wrapper = shallowMount(DexViewDetailDashboard, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        hasWallet: () => false,
      },
    });

    expect(wrapper.find('[data-test="alert"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="view"]').exists()).toBe(false);
  });

  test('if page is displayed', () => {
    const wrapper = shallowMount(DexViewDetailDashboard, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        hasWallet: () => true,
      },
    });

    expect(wrapper.find('[data-test="alert"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="view"]').exists()).toBe(true);
  });

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(DexViewDetailDashboard, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => true,
        hasWallet: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(DexViewDetailDashboard, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => error,
        isLoading: () => false,
        hasWallet: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(DexViewDetailDashboard, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
        hasWallet: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
