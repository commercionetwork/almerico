import { createLocalVue, shallowMount } from '@vue/test-utils';
import ValidatorsViewDetailBlocksMonitor from '../ValidatorsViewDetailBlocksMonitor.vue';

const localVue = createLocalVue();

describe('views/validators/detail/ValidatorsViewDetailBlocksMonitor.vue', () => {
  const mocks = {
    $t: (msg) => msg,
  };
  const computed = {
    isUpdating: () => false,
  };

  test('if info message is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewDetailBlocksMonitor, {
      localVue,
      mocks,
      stubs: ['i18n'],
      computed: {
        ...computed,
        detail: () => ({ id: 1, blocks: [] }),
      },
    });

    expect(wrapper.find('[data-test="info"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorsViewDetailBlocksMonitor, {
      localVue,
      mocks,
      stubs: ['i18n'],
      computed: {
        ...computed,
        detail: () => ({ id: 1, blocks: [{ height: 1 }] }),
      },
    });

    expect(wrapper.find('[data-test="info"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
