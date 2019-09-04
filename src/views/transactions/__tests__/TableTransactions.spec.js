/* global describe, expect, it */

import TableTransactions from "../TableTransactions.vue";
import {
  mockTransactions
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/transactions/TableTransactions.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    transactions: mockTransactions()
  }

  it("Check if table columns are displayed", () => {
    const wrapper = shallowMount(TableTransactions, {
      localVue,
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
      },
      propsData: {
        ...props
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
    const wrapper = shallowMount(TableTransactions, {
      localVue,
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
      },
      propsData: {
        ...props
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
