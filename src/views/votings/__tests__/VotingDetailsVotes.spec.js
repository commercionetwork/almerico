/* global describe, expect, it, jest */

import VotingDetailsVotes from "../VotingDetailsVotes.vue";
import {
  mockVotes
} from "Store/votings/__mocks__/proposals";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/votings/VotingDetailsVotes.vue", () => {
  const computed = {
    votesPage: () => mockVotes(),
    total: () => 5
  };
  const methods = {
    getVotes: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    votingId: "1"
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(VotingDetailsVotes, {
      computed,
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
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
    const wrapper = shallowMount(VotingDetailsVotes, {
      computed,
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items data with pagination are displayed", () => {
    const wrapper = shallowMount(VotingDetailsVotes, {
      computed,
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      votes: mockVotes()
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed and pagination is hidden when list is empty", () => {
    const wrapper = shallowMount(VotingDetailsVotes, {
      computed,
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
