/* global describe, expect, it, jest */

import TransactionsDetails from "../TransactionsDetails.vue";
import {
  mockTransaction
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/transactions/TransactionsDetails.vue", () => {
  const methods = {
    getTransactions: jest.fn()
  };
  const mocks = {
    $route: {
      params: {
        id: "1"
      }
    },
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(TransactionsDetails, {
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
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(TransactionsDetails, {
      localVue,
      methods,
      mocks
    });
    wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(TransactionsDetails, {
      localVue,
      methods,
      mocks,
    });
    wrapper.setData({
      isFetching: false,
      transaction: mockTransaction()
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });
});
