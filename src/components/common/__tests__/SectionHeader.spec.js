/* global describe, expect, it */

import SectionHeader from "../SectionHeader.vue";
import {
  mockPool
} from "Store/stake/__mocks__/pool";
import {
  mockBlock
} from "Store/blocks/__mocks__/blocks";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();


describe("components/common/SectionHeader.vue", () => {
  const computed = {
    block: () => mockBlock(new Date(), "1"),
    pool: () => mockPool()
  };
  const mocks = {
    $n: messageId => messageId,
    $t: messageId => messageId
  };

  it("Check if sections are displayed", () => {
    const wrapper = shallowMount(SectionHeader, {
      computed,
      localVue,
      mocks,
      propsData: {
        bondedEnabled: true,
        heightEnabled: true,
        priceEnabled: true
      }
    });

    expect(wrapper.find('[data-test="live-bonded"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-price"]').exists()).toBe(true);
  });

  it("Check if sections are not displayed", () => {
    const wrapper = shallowMount(SectionHeader, {
      computed,
      localVue,
      mocks,
      propsData: {
        bondedEnabled: false,
        heightEnabled: false,
        priceEnabled: false
      }
    });

    expect(wrapper.find('[data-test="live-bonded"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-price"]').exists()).toBe(false);
  });
});
