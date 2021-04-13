import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mockConversionRate } from '../../../store/dashboard/__mocks__/conversionRate';
import DashboardPrice from '../DashboardPrice.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/dashboard/DashboardPrice.vue', () => {
  test('if loading message is displayed', () => {
    const wrapper = shallowMount(DashboardPrice, {
      localVue,
      computed: {
        error: () => null,
        isLoading: () => true,
        conversionRate: () => '',
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if error message is displayed', () => {
    const wrapper = shallowMount(DashboardPrice, {
      localVue,
      computed: {
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
        conversionRate: () => '',
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(DashboardPrice, {
      localVue,
      computed: {
        error: () => null,
        isLoading: () => false,
        conversionRate: () => mockConversionRate(),
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});