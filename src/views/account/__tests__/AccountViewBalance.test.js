import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import AccountViewBalance from '../AccountViewBalance.vue';

const localVue = createLocalVue();

describe('views/account/AccountViewBalance.vue', () => {
  const actions = {
    initAllBalancesDashboard: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      accountBalance: {
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

  test('if loading indicator is displayed', async () => {
    const wrapper = shallowMount(AccountViewBalance, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
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
    const wrapper = shallowMount(AccountViewBalance, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', async () => {
    const wrapper = shallowMount(AccountViewBalance, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
