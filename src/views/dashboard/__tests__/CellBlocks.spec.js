/* global describe, expect, it, jest */

import CellBlocks from "../CellBlocks.vue";
import {
  mockBlock,
  mockBlocks
} from "Store/blocks/__mocks__/blocks";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/dashboard/CellBlocks.vue", () => {
  const methods = {
    getBlocks: jest.fn()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };

  it("Check if items list is displayed", () => {
    const wrapper = shallowMount(CellBlocks, {
      computed: {
        blocks: () => mockBlocks(),
        isFetching: () => false,
        lastBlock: () => mockBlock(new Date(), 1)
      },
      localVue,
      methods,
      mocks,
    });
    wrapper.setData({
      allBlocks: mockBlocks()
    });

    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(CellBlocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({})
      },
      localVue,
      methods,
      mocks,
    });

    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
