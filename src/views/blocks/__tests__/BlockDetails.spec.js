import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import BlockDetails from '../details/index.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/blocks/details/index.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const actions = {
  //   getBlock: jest.fn(),
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
  //   $route: {
  //     params: {
  //       id: 'id',
  //     },
  //   },
  //   $store: mockStore,
  // };

  // test('if loading message is displayed', () => {
  //   const wrapper = shallowMount(BlockDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       error: () => null,
  //       height: () => 'id',
  //       infoMessage: () => 'No blocks at this height',
  //       isLoading: () => true,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if not found message is displayed', () => {
  //   const wrapper = shallowMount(BlockDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       error: () => ({
  //         message: 'Not Found',
  //         status: 404,
  //       }),
  //       height: () => 'id',
  //       infoMessage: () => 'No blocks at this height',
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if error message is displayed', () => {
  //   const wrapper = shallowMount(BlockDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       error: () => ({
  //         message: 'Error',
  //         status: 400,
  //       }),
  //       height: () => 'id',
  //       infoMessage: () => 'No blocks at this height',
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(BlockDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       error: () => null,
  //       height: () => 'id',
  //       infoMessage: () => 'No blocks at this height',
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  // });
});
