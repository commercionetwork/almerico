/* global describe, expect, it, jest */

import VotingDetailsDeposits from "../VotingDetailsDeposits.vue";
import {
  mockDeposits
} from "Store/votings/__mocks__/proposals";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/votings/VotingDetailsDeposits.vue", () => {
  const computed = {
    depositsPage: () => mockDeposits(),
    total: () => 5
  };
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    votingId: "1"
  };
  VotingDetailsDeposits.methods.getDeposits = jest.fn();

  it("Check if loading message is displayed", async () => {
    const wrapper = shallowMount(VotingDetailsDeposits, {
      computed,
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: true,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", async () => {
    const wrapper = shallowMount(VotingDetailsDeposits, {
      computed,
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items data with pagination are displayed", async () => {
    const wrapper = shallowMount(VotingDetailsDeposits, {
      computed,
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: false,
      deposits: mockDeposits()
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed and pagination is hidden when list is empty", async () => {
    const wrapper = shallowMount(VotingDetailsDeposits, {
      computed,
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: false,
      deposits: []
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
