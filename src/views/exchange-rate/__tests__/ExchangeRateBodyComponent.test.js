import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ExchangeRateBodyComponent from '../ExchangeRateBodyComponent.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

describe('views/exchange-rate/ExchangeRateBodyComponent', () => {
  const computed = {
    errorMessage: () => 'errorMessage',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ExchangeRateBodyComponent, {
      localVue,
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

  test('if error message is displayed', () => {
    const wrapper = shallowMount(ExchangeRateBodyComponent, {
      localVue,
      computed: {
        ...computed,
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ExchangeRateBodyComponent, {
      localVue,
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
