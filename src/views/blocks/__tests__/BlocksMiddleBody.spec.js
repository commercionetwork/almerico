import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import BlocksMiddleBody from '../dashboard/BlocksMiddleBody.vue';
import { mockBlock, mockBlocks } from '../../../store/blocks/__mocks__/blocks';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('views/blocks/dashboard/BlocksMiddleBody.vue', () => {
  const actions = {
    addBlocks: jest.fn(),
    getBlocks: jest.fn(),
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
  };
  const computed = {
    currentHeight: () => '1',
    items: () => [],
    validators: () => [],
    latest: () => mockBlock().block,
    validatorsSet: () => [],
  };

  test('if error message is displayed', () => {
    const wrapper = shallowMount(BlocksMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        blocks: () => [],
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(BlocksMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        blocks: () => mockBlocks(),
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  });

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(BlocksMiddleBody, {
      localVue,
      mocks,
      computed: {
        ...computed,
        blocks: () => mockBlocks(),
        error: () => null,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  });
});
