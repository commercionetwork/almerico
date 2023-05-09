import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ProposalsViewDetail from '../ProposalsViewDetail.vue';

const localVue = createLocalVue();

describe('views/proposals/ProposalsViewDetail.vue', () => {
  const actions = {
    initProposalsDetail: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      proposals: {
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
    const wrapper = shallowMount(ProposalsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(ProposalsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ProposalsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
