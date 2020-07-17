/* global describe, expect, it, jest */

import Validators from "../index.vue";
import {
  mockValidators
} from "Store/validators/__mocks__/validators";
import {
  mockPool
} from "Store/stake/__mocks__/pool";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/index.vue", () => {
  const methods = {
    getLast100Blocks: jest.fn(),
    filterValidators: jest.fn()
  };
  const mocks = {
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => true,
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            live_data: {
              block_height: true,
              count: true,
              bonded_tokens: true,
              time_since_last_block: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items are displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => mockPool(),
        isFetching: () => false,
        validators: () => mockValidators()
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            live_data: {
              block_height: true,
              count: true,
              bonded_tokens: true,
              time_since_last_block: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => false,
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            live_data: {
              block_height: true,
              count: true,
              bonded_tokens: true,
              time_since_last_block: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });

  it("Check if live data are displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => false,
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            live_data: {
              block_height: true,
              count: true,
              bonded_tokens: true,
              time_since_last_block: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-height"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-count"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-tokens"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="live-time"]').exists()).toBe(true);
  });

  it("Check if live data are not displayed", () => {
    const wrapper = shallowMount(Validators, {
      computed: {
        pool: () => {},
        isFetching: () => false,
        validators: () => []
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            live_data: {
              block_height: false,
              count: false,
              bonded_tokens: false,
              time_since_last_block: false
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-height"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-count"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-tokens"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="live-time"]').exists()).toBe(false);
  });
});
