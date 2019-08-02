/* global describe, expect, it */

import TableTransactionsRow from "../TableTransactionsRow.vue";
import {
  mockTransaction
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("views/transactions/TableTransactionsRow.vue", () => {
  const methods = {
    getAmountLabel: () => "0"
  };
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    transaction: mockTransaction()
  }

  it("Check if table columns are displayed", () => {
    const wrapper = shallowMount(TableTransactionsRow, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [{
              name: "commercio",
              symbol: "CNT",
              denom: "ucommercio",
              exponent: 6,
              stakeable: true
            }]
          },
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
    const wrapper = shallowMount(TableTransactionsRow, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [{
              name: "commercio",
              symbol: "CNT",
              denom: "ucommercio",
              exponent: 6,
              stakeable: true
            }]
          },
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
