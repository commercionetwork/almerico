/* global describe, expect, it, jest */

import Blocks from "../index.vue";
import {
  mockBlock,
  mockBlocks
} from "Store/blocks/__mocks__/blocks";
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

  it("Check if live data are displayed", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({}),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: {
              enabled: true
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(true);
  });

  it("Check if live data are not displayed", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({}),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: {
              enabled: false
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(false);
  });

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => true,
        lastBlock: () => ({}),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const message = "error";
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({}),
        message: () => message
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: true
          }
        }
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual(message);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items list with pagination is displayed", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => mockBlocks(),
        isFetching: () => false,
        lastBlock: () => mockBlock(new Date(), 1),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed when list is empty", () => {
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({}),
        message: () => ""
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: true
          }
        }
      }
    });

    expect(wrapper.find('[data-test="pagination"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
