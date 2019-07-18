/* global describe, expect, it */

import ValidatorDetailsEvents from "../ValidatorDetailsEvents.vue";
import {
  mockTransactions
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/ValidatorDetailsEvents.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if pagination and items are displayed", () => {
    const wrapper = shallowMount(ValidatorDetailsEvents, {
      propsData: {
        events: mockTransactions()
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(ValidatorDetailsEvents, {
      propsData: {
        events: []
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
