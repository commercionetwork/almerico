import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { mockBlock } from '../../../store/blocks/__mocks__/blocks';
import ValidatorDetailsBlocks from '../details/ValidatorDetailsBlocks.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/validators/details/ValidatorDetailsBlocks.vue', () => {
  const actions = {
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
    blocks: () => [],
    details: () => ({}),
    latest: () => mockBlock().block,
    latestValidatorsSets: () => [],
    title: () => 'title',
  };

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(ValidatorDetailsBlocks, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => true,
        verifiedBlocks: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="warning"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorDetailsBlocks, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => false,
        verifiedBlocks: () => [
          {
            blocks: [
              {
                height: '1',
                status: 1,
              },
            ],
            count: 100,
            percentage: '100.00%',
          },
        ],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="warning"]').exists()).toBe(false);
  });

  test('if warning message is displayed', () => {
    const wrapper = shallowMount(ValidatorDetailsBlocks, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => false,
        verifiedBlocks: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="warning"]').exists()).toBe(true);
  });
});
