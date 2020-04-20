/* global describe, expect, it, jest */

import Account from "../index.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/account/index.vue", () => {
  const computed = {
    delegations: () => [],
    membership: () => "",
    rewards: () => ({}),
    unbondings: () => [],
  };
  const methods = {
    fetchAccount: jest.fn()
  };
  const mocks = {
    $route: {
      params: {
        id: "id"
      }
    },
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Account, {
      computed: {
        ...computed,
        isFetching: () => true,
        isError: () => false,
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(Account, {
      computed: {
        ...computed,
        isFetching: () => false,
        isError: () => true,
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(Account, {
      computed: {
        ...computed,
        isFetching: () => false,
        isError: () => false,
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
  });
});
