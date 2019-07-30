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
      mocks
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
      mocks
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
      mocks
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
      mocks
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
