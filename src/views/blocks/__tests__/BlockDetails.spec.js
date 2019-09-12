/* global describe, expect, it, jest */

import BlockDetails from "../BlockDetails.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import { mockTransactions } from "Store/transactions/__mocks__/transactions";

const localVue = createLocalVue();

describe("views/blocks/BlockDetails.vue", () => {
  const computed = {
    blockId: () => "1",
    blockTxs: () => mockTransactions(),
    transactions: () => mockTransactions()
  };
  const methods = {
    fetchBlock: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(BlockDetails, {
      computed: {
        ...computed,
        validators: () => [],
        isFetching: () => true,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            txs_list: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(BlockDetails, {
      computed: {
        ...computed,
        validators: () => [],
        isFetching: () => false,
        hasError: () => true,
        title: () => "title"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            txs_list: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(BlockDetails, {
      computed: {
        ...computed,
        validators: () => [],
        isFetching: () => false,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            txs_list: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });

  it("Check if transactions list is displayed", () => {
    const wrapper = shallowMount(BlockDetails, {
      computed: {
        ...computed,
        validators: () => [],
        isFetching: () => false,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            txs_list: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="txs-list"]').exists()).toBe(true);
  });

  it("Check if transactions list is not displayed", () => {
    const wrapper = shallowMount(BlockDetails, {
      computed: {
        ...computed,
        validators: () => [],
        isFetching: () => false,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            txs_list: false
          }
        }
      }
    });

    expect(wrapper.find('[data-test="txs-list"]').exists()).toBe(false);
  });
});
