/* global describe, expect, it, jest */

import Transactions from "../index.vue";
import {
  mockTransactions
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/transactions/index.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if live data are displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => true,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: {
              enabled: true
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(true);
  });

  it("Check if live data are not displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => true,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: {
              enabled: false
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(false);
  });

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => true,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => false,
        message: () => "error",
        transactions: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items list with pagination is displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => false,
        message: () => "",
        orderedTransactions: () => mockTransactions(),
        transactions: () => mockTransactions()
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        isFetching: () => false,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
