import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ValidatorsViewDetail from '../ValidatorsViewDetail.vue';

const localVue = createLocalVue();

describe('views/validators/ValidatorsViewDetail.vue', () => {
  const actions = {
    initValidatorsDetail: jest.fn(),
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
  const props = {
    id: 'id',
  };
  const computed = {
    eventHeight: () => ({ hegiht: '1', hasTxs: false }),
  };

  test('if loading indicator is displayed', async () => {
    const wrapper = shallowMount(ValidatorsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
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

  test('if message error is displayed', async () => {
    const error = Error('message');
    const wrapper = shallowMount(ValidatorsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
      computed: {
        ...computed,
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', async () => {
    const wrapper = shallowMount(ValidatorsViewDetail, {
      localVue,
      mocks,
      propsData: {
        ...props,
      },
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
