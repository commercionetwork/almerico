/* global describe, expect, it, jest */

import Blocks from "../index.vue";
import mockBlocks from "Store/blocks/__mocks__/blocks";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/blocks/index.vue", () => {
  const methods = {
    getBlocks: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed when list is empty", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => true,
        lastBlock: () => ({}),
        message: () => ""
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });
});
