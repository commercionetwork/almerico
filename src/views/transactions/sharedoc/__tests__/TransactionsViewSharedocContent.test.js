import { createLocalVue, shallowMount } from '@vue/test-utils';
import TransactionsViewSharedocContent from '../TransactionsViewSharedocContent.vue';

import { CONFIG } from '@/constants';

const localVue = createLocalVue();

describe('views/transactions/sharedoc/TransactionsViewSharedocContent.vue', () => {
  const mocks = {
    $t: (msg) => msg,
  };
  const computed = {
    uuid: () => 'uuid',
    tx: () => ({ msgs: [] }),
    message: () => ({}),
  };
  const mountWithVersion = (version) =>
    shallowMount(TransactionsViewSharedocContent, {
      localVue,
      mocks,
      computed: {
        ...computed,
        detail: () => ({ version }),
      },
    });

  test('if sharedoc message component is used for current node txs', () => {
    const wrapper = mountWithVersion('');

    expect(wrapper.vm.componentName).toBe('TransactionsViewSharedocMessage');
  });

  test('if sharedoc message component is used for v0.45 ancestor txs', () => {
    const wrapper = mountWithVersion(CONFIG.SDK_VERSIONS.V_045);

    expect(wrapper.vm.componentName).toBe('TransactionsViewSharedocMessage');
  });

  test('if default message component is used for v0.38 ancestor txs', () => {
    const wrapper = mountWithVersion(CONFIG.SDK_VERSIONS.V_038);

    expect(wrapper.vm.componentName).toBe('MsgDefault');
  });
});
