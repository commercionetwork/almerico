/* global describe, expect, it, jest */

import CellBlocksRow from "../CellBlocksRow.vue";
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

describe("views/dashboard/CellBlocksRow.vue", () => {
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    block: mockBlock(new Date(), 1),
    rank: 0
  };
  CellBlocksRow.methods.getProposer = jest.fn();

  it("Check if loading messages are displayed", async () => {
    const wrapper = shallowMount(CellBlocksRow, {
      computed: {
        validators: () => ({})
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: true,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", async () => {
    const wrapper = shallowMount(CellBlocksRow, {
      computed: {
        validators: () => ({})
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(true);
  });

  it("Check if item data are displayed", async () => {
    const wrapper = shallowMount(CellBlocksRow, {
      computed: {
        validators: () => ({})
      },
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item-proposer"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-txs"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-date"]').exists()).toBe(true);
  });
});
