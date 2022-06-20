import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import BlocksViewDetail from '../BlocksViewDetail.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/blocks/BlocksViewDetail.vue', () => {
  const actions = {
    initBlockCountdown: jest.fn(),
    initBlocksDetail: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      blocks: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
    $t: (msg) => msg,
  };
  const props = {
    id: 'id',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(BlocksViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => true,
        isFutureHeight: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="countdown"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="block-detail"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(BlocksViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => error,
        isLoading: () => false,
        isFutureHeight: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="countdown"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="block-detail"]').exists()).toBe(false);
  });

  test('if block countdown is displayed', () => {
    const wrapper = shallowMount(BlocksViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => false,
        isFutureHeight: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="countdown"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="block-detail"]').exists()).toBe(false);
  });

  test('if block detail is displayed', () => {
    const wrapper = shallowMount(BlocksViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => false,
        isFutureHeight: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="countdown"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="block-detail"]').exists()).toBe(true);
  });
});
