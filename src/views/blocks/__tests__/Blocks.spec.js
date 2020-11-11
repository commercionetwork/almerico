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
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/blocks/index.vue", () => {
  const actions = {
    fetchBlocks: jest.fn()
  };
  const mockStore = new Vuex.Store({
    modules: {
      blocks: {
        namespaced: true,
        actions,
      }
    }
  });
  const mocks = {
    $store: mockStore,
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

  it("Check if error message is displayed", async () => {
    const message = "error";
    const wrapper = shallowMount(Blocks, {
      computed: {
        blocks: () => [],
        isFetching: () => false,
        lastBlock: () => ({}),
        message: () => message
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            live_data: true
          }
        }
      }
    });
    await wrapper.setData({
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
