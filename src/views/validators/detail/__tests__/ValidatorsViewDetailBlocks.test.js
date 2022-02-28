import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ValidatorsViewDetailBlocks from '../ValidatorsViewDetailBlocks.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

describe('views/validators/detail/ValidatorsViewDetailBlocks.vue', () => {
  const mocks = {
    $t: (msg) => msg,
  };
  const computed = {
    isLoadingBlocks: () => false,
    detail: () => ({ id: 1 }),
    blocks: () => [{ id: 1 }],
  };

  test('if info message is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewDetailBlocks, {
      localVue,
      mocks,
      stubs: ['i18n'],
      computed: {
        ...computed,
        verifiedBlocks: () => [],
      },
    });

    expect(wrapper.find('[data-test="info"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewDetailBlocks, {
      localVue,
      mocks,
      stubs: ['i18n'],
      computed: {
        ...computed,
        verifiedBlocks: () => [{ id: 1 }],
      },
    });

    expect(wrapper.find('[data-test="info"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
