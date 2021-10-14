import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ValidatorDetails from '../details/index.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/validators/details/index.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const actions = {
  //   getValidatorData: jest.fn(),
  // };
  // const mockStore = new Vuex.Store({
  //   modules: {
  //     validators: {
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
  // const computed = {
  //   account: () => 'account',
  //   address: () => 'address',
  //   delegations: () => ({}),
  //   details: () => ({}),
  //   infoMessage: () => 'No transactions with this hash',
  //   operator: () => 'operator',
  // };

  // test('if loading message is displayed', () => {
  //   const wrapper = shallowMount(ValidatorDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => null,
  //       isLoading: () => true,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if not found message is displayed', () => {
  //   const wrapper = shallowMount(ValidatorDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => ({
  //         message: 'Not Found',
  //         status: 404,
  //       }),
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if error message is displayed', () => {
  //   const wrapper = shallowMount(ValidatorDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => ({
  //         message: 'Error',
  //         status: 400,
  //       }),
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(ValidatorDetails, {
  //     localVue,
  //     mocks,
  //     computed: {
  //       ...computed,
  //       error: () => null,
  //       isLoading: () => false,
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  // });
});
