/* global describe, expect, it, jest */

import BlocksDetails from "../BlocksDetails.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/blocks/BlocksDetails.vue", () => {
  const methods = {
    fetchBlock: jest.fn(),
    fetchTransactions: jest.fn()
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
    const wrapper = shallowMount(BlocksDetails, {
      computed: {
        validators: () => [],
        isFetching: () => true,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(BlocksDetails, {
      computed: {
        validators: () => [],
        isFetching: () => false,
        hasError: () => true,
        title: () => "title"
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(BlocksDetails, {
      computed: {
        validators: () => [],
        isFetching: () => false,
        hasError: () => false,
        title: () => "title"
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });
});
