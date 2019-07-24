/* global describe, expect, it */

import AccountDelegations from "../AccountDelegations.vue";
import {
  mockDelegations
} from "Store/account/__mocks__/delegations";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/account/AccountDelegations.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if pagination and items are displayed", () => {
    const wrapper = shallowMount(AccountDelegations, {
      propsData: {
        delegations: mockDelegations()
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(AccountDelegations, {
      propsData: {
        delegations: []
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
