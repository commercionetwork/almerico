/* global describe, expect, it */

import Dashboard from "../index.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/dashboard/index.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if sections are displayed", () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          dashboard: {
            chains: {
              enabled: true
            },
            graphs: {
              enabled: true,
              price: true,
              block_height: true,
              bonded_tokens: true
            },
            live_data: {
              enabled: true,
              blocks: true,
              transactions: true
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="chain-chooser"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="graphs-price"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="graphs-block-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="graphs-bonded-tokens"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-data-blocks"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-data-transactions"]').exists()).toBe(true);
  });

  it("Check if sections are not displayed", () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          dashboard: {
            chains: {
              enabled: false
            },
            graphs: {
              enabled: false,
              price: true,
              block_height: true,
              bonded_tokens: true
            },
            live_data: {
              enabled: false,
              blocks: true,
              transactions: true
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="chain-chooser"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="graphs-price"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="graphs-block-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="graphs-bonded-tokens"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-data-blocks"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-data-transactions"]').exists()).toBe(false);
  });

  it("Check if single sections are not displayed", () => {
    const wrapper = shallowMount(Dashboard, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          dashboard: {
            chains: {
              enabled: true
            },
            graphs: {
              enabled: true,
              price: false,
              block_height: false,
              bonded_tokens: false
            },
            live_data: {
              enabled: true,
              blocks: false,
              transactions: false
            }
          }
        }
      }
    });

    expect(wrapper.find('[data-test="graphs-price"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="graphs-block-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="graphs-bonded-tokens"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-data-blocks"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-data-transactions"]').exists()).toBe(false);
  });
});
