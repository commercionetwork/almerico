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
  const methods = {
    getTransactions: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        transactions: () => [],
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: true,
                type: true,
                result: true,
                amount: true,
                fee: true,
                block_height: true,
                date: true
              }
            }
          }
        }
      }
    });
    wrapper.setData({
      isFetching: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const message = "error";
    const wrapper = shallowMount(Transactions, {
      computed: {
        transactions: () => [],
        message: () => message
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: true,
                type: true,
                result: true,
                amount: true,
                fee: true,
                block_height: true,
                date: true
              }
            }
          }
        }
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual(message);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items list with pagination is displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        transactions: () => mockTransactions(),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: true,
                type: true,
                result: true,
                amount: true,
                fee: true,
                block_height: true,
                date: true
              }
            }
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
        transactions: () => [],
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: true,
                type: true,
                result: true,
                amount: true,
                fee: true,
                block_height: true,
                date: true
              }
            }
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

  it("Check if table columns are displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        transactions: () => [],
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: true,
                type: true,
                result: true,
                amount: true,
                fee: true,
                block_height: true,
                date: true
              }
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-type"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-result"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-amount"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-fee"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(true);
  });

  it("Check if table columns are not displayed", () => {
    const wrapper = shallowMount(Transactions, {
      computed: {
        transactions: () => [],
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transactions: {
            table: {
              columns: {
                hash: false,
                type: false,
                result: false,
                amount: false,
                fee: false,
                block_height: false,
                date: false
              }
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-type"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-result"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-amount"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-fee"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(false);
  });
});
