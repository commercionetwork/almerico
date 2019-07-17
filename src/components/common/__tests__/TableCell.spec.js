/* global describe, expect, it */

import TableCell from "../TableCell.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("components/common/TableCell.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    link: {},
    title: "title"
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(TableCell, {
      localVue,
      mocks,
      propsData: {
        ...props,
        isFetching: true
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if items are displayed", () => {
    const wrapper = shallowMount(TableCell, {
      localVue,
      mocks,
      propsData: {
        ...props,
        isFetching: false
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
  });
});
