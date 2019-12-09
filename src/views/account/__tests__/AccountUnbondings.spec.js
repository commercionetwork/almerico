/* global describe, expect, it */

import AccountUnbondings from "../AccountUnbondings.vue";
import {
  mockUnbondings
} from "Store/account/__mocks__/unbondings";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/account/AccountUnbondings.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if pagination and items are displayed", () => {
    const wrapper = shallowMount(AccountUnbondings, {
      propsData: {
        delegations: mockUnbondings()
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(AccountUnbondings, {
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