/* global describe, expect, it, jest */

import AccountTransactions from "../AccountTransactions.vue";
import {
  mockTransactions
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/account/AccountTransactions.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    address: "address"
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(AccountTransactions, {
      computed: {
        isFetching: () => true,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(AccountTransactions, {
      computed: {
        isFetching: () => false,
        message: () => "error",
        transactions: () => []
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items data are displayed", () => {
    const wrapper = shallowMount(AccountTransactions, {
      computed: {
        isFetching: () => false,
        message: () => "",
        orderedTransactions: () => mockTransactions(),
        transactions: () => mockTransactions()
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed", () => {
    const wrapper = shallowMount(AccountTransactions, {
      computed: {
        isFetching: () => false,
        message: () => "",
        transactions: () => []
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
