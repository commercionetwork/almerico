import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import BlocksViewList from '../BlocksViewList.vue';

const localVue = createLocalVue();

describe('views/blocks/BlocksViewList.vue', () => {
  const actions = {
    initBlocksList: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      blocks: {
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
    lastHeight: () => '1',
    newHeight: () => '1',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(BlocksViewList, {
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
    const wrapper = shallowMount(BlocksViewList, {
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
    const wrapper = shallowMount(BlocksViewList, {
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
