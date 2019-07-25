/* global describe, expect, it, jest */

import TransactionDetailsInfo from "../TransactionDetailsInfo.vue";
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

describe("views/transactions/TransactionDetailsInfo.vue", () => {
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    transaction: mockTransaction()
  }

  it("Check if header rows are displayed", () => {
    const wrapper = shallowMount(TransactionDetailsInfo, {
      computed: {
        fee: () => "fee",
        gasWanted: () => "0",
        gasUsed: () => "0",
        result: () => "success"
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      Config: {
        transaction_details: {
          rows: {
            hash: true,
            status: true,
            block_height: true,
            date: true,
            fee: true,
            gas: true
          },
        }
      }
    });

    expect(wrapper.find('[data-test="row-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-status"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-block-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-date"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-fee"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-gas"]').exists()).toBe(true);
  });
});
