import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import HomeViewGridList from '../HomeViewGridList.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/home/HomeViewGridList.vue', () => {
  const computed = {
    transactions: () => [],
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(HomeViewGridList, {
      localVue,
      computed: {
        ...computed,
        isLoadingTxs: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(HomeViewGridList, {
      localVue,
      computed: {
        ...computed,
        isLoadingTxs: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
