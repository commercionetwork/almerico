/* global describe, expect, it */

import CellTokens from "../CellTokens.vue";
import {
  mockGenesis
} from "Store/tendermint/__mocks__/genesis";
import {
  mockPool
} from "Store/stake/__mocks__/pool";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/CellTokens.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(CellTokens, {
      computed: {
        isFetchingPool: () => true,
        pool: () => {},
        isFetchingGenesis: () => true,
        genesis: () => {}
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if items data are displayed", () => {
    const wrapper = shallowMount(CellTokens, {
      computed: {
        isFetchingPool: () => false,
        pool: () => mockPool(),
        isFetchingGenesis: () => false,
        genesis: () => mockGenesis()
      },
      localVue,
      mocks
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
  });
});
