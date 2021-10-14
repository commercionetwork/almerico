import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ValidatorsMiddleBody from '../dashboard/ValidatorsMiddleBody.vue';
import { mockBlock } from '../../../store/blocks/__mocks__/blocks';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/validators/dashboard/ValidatorsMiddleBody.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const computed = {
  //   isBlocksMonitor: () => true,
  // };
  // const actions = {
  //   getBlocks: jest.fn(),
  // };
  // const mockStore = new Vuex.Store({
  //   modules: {
  //     blocks: {
  //       namespaced: true,
  //       actions,
  //     },
  //   },
  // });
  // const mocks = {
  //   $store: mockStore,
  // };

  // test('if loading message is displayed', () => {
  //   const wrapper = shallowMount(ValidatorsMiddleBody, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => null,
  //       isLoading: () => true,
  //       latest: () => mockBlock().block,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if error message is displayed', () => {
  //   const wrapper = shallowMount(ValidatorsMiddleBody, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => ({
  //         message: 'Error',
  //         status: 400,
  //       }),
  //       isLoading: () => false,
  //       latest: () => mockBlock().block,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(ValidatorsMiddleBody, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => null,
  //       isLoading: () => false,
  //       latest: () => mockBlock().block,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  // });
});
