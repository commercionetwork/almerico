/* global describe, expect, it */

import HeaderCell from "../HeaderCell.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("components/common/HeaderCell.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(HeaderCell, {
      localVue,
      mocks,
      propsData: {
        isFetching: true
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if items are displayed without chart", () => {
    const wrapper = shallowMount(HeaderCell, {
      localVue,
      mocks,
      propsData: {
        isFetching: false
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-chart"]').exists()).toBe(false);
  });

  it("Check if items are displayed with chart", () => {
    const wrapper = shallowMount(HeaderCell, {
      localVue,
      mocks,
      propsData: {
        chart: true,
        isFetching: false
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="item-chart"]').exists()).toBe(true);

  });
});
