/* global describe, expect, it */

import TableBlocks from "../TableBlocks.vue";
import {
  mockBlocks
} from "Store/blocks/__mocks__/blocks";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/blocks/TableBlocks.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    blocks: mockBlocks()
  };

  it("Check if table columns are displayed", () => {
    const wrapper = shallowMount(TableBlocks, {
      localVue,
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
    const wrapper = shallowMount(TableBlocks, {
      localVue,
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
