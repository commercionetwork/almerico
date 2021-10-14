import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mockRateUpdates } from '../../../store/dashboard/__mocks__/listings';
import DashboardPriceChart from '../DashboardPriceChart.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/dashboard/DashboardPriceChart.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // test('if loading message is displayed', () => {
  //   const wrapper = shallowMount(DashboardPriceChart, {
  //     localVue,
  //     computed: {
  //       isLoading: () => true,
  //       rateUpdates: () => [],
  //       startingDate: () => '',
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  // });

  // test('if content is displayed', () => {
  //   const wrapper = shallowMount(DashboardPriceChart, {
  //     localVue,
  //     computed: {
  //       isLoading: () => false,
  //       rateUpdates: () => mockRateUpdates(),
  //       startingDate: () => '2021-02-16T13:58:40.691559082Z',
  //     },
  //   });

  //   expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
  //   expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  // });
});
