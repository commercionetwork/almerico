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
      mocks,
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
      mocks,
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
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });
});
