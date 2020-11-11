/* global describe, expect, it, jest */

import VotingDetails from "../VotingDetails.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("views/votings/VotingDetails.vue", () => {
  const computed = {
    votingId: () => "1"
  };
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };
  VotingDetails.methods.fetchVoting = jest.fn();

  it("Check if loading message is displayed", async () => {
    const wrapper = shallowMount(VotingDetails, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          voting_details: {
            result: true,
            votes: true,
            deposits: true
          }
        }
      },
      router
    });
    await wrapper.setData({
      isFetching: true,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", async () => {
    const wrapper = shallowMount(VotingDetails, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          voting_details: {
            result: true,
            votes: true,
            deposits: true
          }
        }
      },
      router
    });
    await wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", async () => {
    const wrapper = shallowMount(VotingDetails, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          voting_details: {
            result: true,
            votes: true,
            deposits: true
          }
        }
      },
      router
    });
    await wrapper.setData({
      isFetching: false,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });

  it("Check if voting result, votes and deposits are displayed", async () => {
    const wrapper = shallowMount(VotingDetails, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          voting_details: {
            result: true,
            votes: true,
            deposits: true
          }
        }
      },
      router
    });
    await wrapper.setData({
      isFetching: false,
      hasError: false
    });

    expect(wrapper.find('[data-test="result"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="votes"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="deposits"]').exists()).toBe(true);
  });

  it("Check if voting result, votes and deposits are not displayed", () => {
    const wrapper = shallowMount(VotingDetails, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          voting_details: {
            result: false,
            votes: false,
            deposits: false
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="result"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="votes"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="deposits"]').exists()).toBe(false);
  });
});
