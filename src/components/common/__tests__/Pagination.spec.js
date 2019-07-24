/* global describe, expect, it */

import Pagination from "../Pagination.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("components/common/Pagination.vue", () => {
  const limit = 10;
  const total = 50;

  it("Check if first page is displayed", () => {
    const page = 3;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="first-page"]').exists()).toBe(true);
  });

  it("Check if first page is not displayed when selected page is the first", () => {
    const page = 1;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="first-page"]').exists()).toBe(false);
  });

  it("Check if previous page is displayed", () => {
    const page = 3;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="previous-page"]').exists()).toBe(true);
    const expectPreviousPage = (page - 1).toString();
    expect(wrapper.find('[data-test="previous-page"]').text()).toEqual(expectPreviousPage);
  });

  it("Check if previous page is not displayed", () => {
    const page = 1;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="previous-page"]').exists()).toBe(false);
  });

  it("Check if next page is displayed", () => {
    const page = 3;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="next-page"]').exists()).toBe(true);
    const expectnextPage = (page + 1).toString();
    expect(wrapper.find('[data-test="next-page"]').text()).toEqual(expectnextPage);
  });

  it("Check if next page is not displayed", () => {
    const page = 5;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="next-page"]').exists()).toBe(false);
  });

  it("Check if last page is displayed", () => {
    const page = 3;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="last-page"]').exists()).toBe(true);
  });

  it("Check if last page is not displayed when selected page is the last", () => {
    const page = 5;
    const wrapper = shallowMount(Pagination, {
      localVue,
      propsData: {
        limit,
        page,
        total
      }
    });

    expect(wrapper.find('[data-test="last-page"]').exists()).toBe(false);
  });
});
