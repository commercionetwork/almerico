import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import BlocksMiddleBody from '../dashboard/BlocksMiddleBody.vue';
import { mockBlock, mockBlocks } from '../../../store/blocks/__mocks__/blocks';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

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

  test('if error message is displayed', () => {
    const wrapper = shallowMount(BlocksMiddleBody, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        blocks: () => [],
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        currentHeight: () => '1',
        isLoading: () => false,
        items: () => [],
        validators: () => [],
        latest: () => null,
        validatorsSet: () => [],
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(BlocksMiddleBody, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        blocks: () => mockBlocks(),
        error: () => null,
        currentHeight: () => '1',
        isLoading: () => false,
        items: () => [],
        latest: () => mockBlock().block,
        validators: () => [],
        validatorsSet: () => [],
      },
    });

    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
