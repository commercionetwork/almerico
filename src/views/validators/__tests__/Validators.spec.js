/* global describe, expect, it, jest */

import Validators from "../index.vue";
import {
  mockValidators
} from "Store/validators/__mocks__/validators";
import {
  mockPool
} from "Store/stake/__mocks__/pool";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/index.vue", () => {
  const methods = {
    filterValidators: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => true,
        validators: () => []
      },
      localVue,
      methods,
      mocks
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items are displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => mockPool(),
        isFetching: () => false,
        validators: () => mockValidators()
      },
      localVue,
      methods,
      mocks
    });
    wrapper.setData({
      filteredValidators: mockValidators()
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => false,
        validators: () => []
      },
      localVue,
      methods,
      mocks
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
