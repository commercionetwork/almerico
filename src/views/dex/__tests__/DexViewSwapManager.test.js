import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DexViewSwapManager from '../DexViewSwapManager.vue';

const localVue = createLocalVue();

describe('views/dex/DexViewSwapManager.vue', () => {
  const actions = {
    fetchDex: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      dex: {
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
    contract: { id: 1 },
  };
  const mockDetail = {
    id: 'id',
    lp: {
      id: 'id',
      balance: '',
      decimals: 6,
      supply: '0',
      lpFeePercent: '0.5',
      protocolFeePercent: '0.5',
      allowance: '0',
    },
    token1: {
      id: 'id',
      denom: 'denom',
      reserve: '0',
      type: 'native',
      balance: '0',
      decimals: 6,
    },
    token2: {
      reserve: '0',
      type: 'cw20',
      id: 'id',
      denom: 'denom',
      decimals: 6,
      allowance: '0',
    },
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(DexViewSwapManager, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        isFetching: () => true,
        detail: () => null,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="info"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if info message is displayed', () => {
    const wrapper = shallowMount(DexViewSwapManager, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        isFetching: () => false,
        detail: () => null,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="info"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(DexViewSwapManager, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },

      data() {
        return {
          model: {
            amount: '0.01',
            tokenFrom: mockDetail.token1,
            tokenTo: mockDetail.token2,
          },
        };
      },
      computed: {
        isFetching: () => false,
        detail: () => mockDetail,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="info"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
