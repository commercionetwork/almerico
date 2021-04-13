import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mockRateUpdates } from '../../../store/dashboard/__mocks__/rateUpdates';
import DashboardPriceChart from '../DashboardPriceChart.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/dashboard/DashboardPriceChart.vue', () => {
  test('if loading message is displayed', () => {
    const wrapper = shallowMount(DashboardPriceChart, {
      localVue,
      computed: {
        error: () => null,
        isLoading: () => true,
        rateUpdates: () => [],
        startingDate: () => '',
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if error message is displayed', () => {
    const wrapper = shallowMount(DashboardPriceChart, {
      localVue,
      computed: {
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
        rateUpdates: () => [],
        startingDate: () => '',
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(DashboardPriceChart, {
      localVue,
      computed: {
        error: () => null,
        isLoading: () => false,
        rateUpdates: () => mockRateUpdates(),
        startingDate: () => '2021-02-16T13:58:40.691559082Z',
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
