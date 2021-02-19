import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import AccountDetails from '../account/index.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(Vuetify);

describe('views/validators/account/index.vue', () => {
  const actions = {
    getAccount: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      account: {
        namespaced: true,
        actions,
      },
    },
  });

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(AccountDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        error: () => null,
        address: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if not found message is displayed', () => {
    const wrapper = shallowMount(AccountDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        error: () => ({
          message: 'Not Found',
          status: 404,
        }),
        address: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if error message is displayed', () => {
    const wrapper = shallowMount(AccountDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        address: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(AccountDetails, {
      localVue,
      mocks: {
        $store: mockStore,
      },
      computed: {
        error: () => null,
        address: () => 'id',
        infoMessage: () => 'No transactions with this hash',
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="not-found"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
