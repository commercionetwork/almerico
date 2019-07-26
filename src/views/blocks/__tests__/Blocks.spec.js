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
            table: {
              columns: {
                height: true,
                hash: true,
                proposer: true,
                txs: true,
                date: true
              }
            }
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
            table: {
              columns: {
                height: true,
                hash: true,
                proposer: true,
                txs: true,
                date: true
              }
            }
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
            table: {
              columns: {
                height: true,
                hash: true,
                proposer: true,
                txs: true,
                date: true
              }
            }
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
            table: {
              columns: {
                height: true,
                hash: true,
                proposer: true,
                txs: true,
                date: true
              }
            }
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

  it("Check if table columns are displayed", () => {
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
            table: {
              columns: {
                height: true,
                hash: true,
                proposer: true,
                txs: true,
                date: true
              }
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-proposer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(true);
  });

  it("Check if table columns are not displayed", () => {
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
            table: {
              columns: {
                height: false,
                hash: false,
                proposer: false,
                txs: false,
                date: false
              }
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-txs"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(false);
  });
});
