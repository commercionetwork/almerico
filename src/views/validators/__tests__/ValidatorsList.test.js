import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ValidatorsList from '../ValidatorsList.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/validators/ValidatorsList.vue', () => {
  const actions = {
    initValidatorsList: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      validators: {
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
    newHeight: () => 'newHeight',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ValidatorsList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorsList, {
      localVue,
      mocks,
      computed: {
        ...computed,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
