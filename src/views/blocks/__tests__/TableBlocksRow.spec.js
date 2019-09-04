/* global describe, expect, it, jest */

import TableBlocksRow from "../TableBlocksRow.vue";
import {
  mockBlock
} from "Store/blocks/__mocks__/blocks";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("views/blocks/TableBlocksRow.vue", () => {
  const methods = {
    getProposer: jest.fn()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    block: mockBlock(new Date(), 1),
    rank: 0
  };

  it("Check if loading messages are displayed", () => {
    const wrapper = shallowMount(TableBlocksRow, {
      computed: {
        validators: () => ({})
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
      },
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      isFetching: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-hash"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(false);
  });

  it("Check if error message are displayed", () => {
    const wrapper = shallowMount(TableBlocksRow, {
      computed: {
        validators: () => ({})
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
      },
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(true);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(TableBlocksRow, {
      computed: {
        validators: () => ({})
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
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(true);
  });

  it("Check if table columns are displayed", () => {
    const wrapper = shallowMount(TableBlocksRow, {
      computed: {
        validators: () => ({})
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
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-proposer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(true);
  });

  it("Check if table columns are not displayed", () => {
    const wrapper = shallowMount(TableBlocksRow, {
      computed: {
        validators: () => ({})
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
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="table-column-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-hash"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-txs"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-date"]').exists()).toBe(false);
  });
});
