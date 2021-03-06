/* global describe, expect, it, jest */

import BlockDetailsHeader from "../BlockDetailsHeader.vue";
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

describe("views/blocks/BlockDetailsHeader.vue", () => {
  const methods = {
    getProposer: jest.fn()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    block: mockBlock(new Date(), 1)
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(BlockDetailsHeader, {
      computed: {
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            rows: {
              height: true,
              date: true,
              hash: true,
              txs_number: true,
              proposing_node: true
            },
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
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(BlockDetailsHeader, {
      computed: {
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            rows: {
              height: true,
              date: true,
              hash: true,
              txs_number: true,
              proposing_node: true
            },
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
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(BlockDetailsHeader, {
      computed: {
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            rows: {
              height: true,
              date: true,
              hash: true,
              txs_number: true,
              proposing_node: true
            },
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });

  it("Check if header rows are displayed", () => {
    const wrapper = shallowMount(BlockDetailsHeader, {
      computed: {
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            rows: {
              height: true,
              date: true,
              hash: true,
              txs_number: true,
              proposing_node: true
            },
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="row-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-date"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-hash"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-txs-number"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-proposing-node"]').exists()).toBe(true);
  });

  it("Check if header rows are not displayed", () => {
    const wrapper = shallowMount(BlockDetailsHeader, {
      computed: {
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          block_details: {
            rows: {
              height: false,
              date: false,
              hash: false,
              txs_number: false,
              proposing_node: false
            },
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="row-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-date"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-hash"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-txs-number"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-proposing-node"]').exists()).toBe(false);
  });
});
