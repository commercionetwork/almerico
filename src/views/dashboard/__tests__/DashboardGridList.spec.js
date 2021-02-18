import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { mockTxs } from '../../../store/transactions/__mocks__/txs';
import DashboardGridList from '../DashboardGridList.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/dashboard/DashboardGridList.vue', () => {
  const props = {
    limit: 10,
  };

  test('if loading message is displayed', () => {
    const wrapper = shallowMount(DashboardGridList, {
      localVue,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => true,
        txs: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if error message is displayed', () => {
    const wrapper = shallowMount(DashboardGridList, {
      localVue,
      propsData: {
        ...props,
      },
      computed: {
        error: () => ({
          message: 'Error',
          status: 400,
        }),
        isLoading: () => false,
        txs: () => [],
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(DashboardGridList, {
      localVue,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => false,
        txs: () => mockTxs(),
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
