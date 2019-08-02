/* global describe, expect, it, jest */

import ValidatorDetails from "../ValidatorDetails.vue";
import {
  mockDelegations
} from "Store/account/__mocks__/delegations";
import {
  mockTransactions
} from "Store/transactions/__mocks__/transactions";
import {
  mockValidator
} from "Store/validators/__mocks__/validators";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/ValidatorDetails.vue", () => {
  const methods = {
    getValidatorData: jest.fn()
  };
  const mocks = {
    $route: {
      params: {
        id: "comnetvaloper1t8xx727yrvep0w7ylunz609vn2sarf5ckrval5"
      }
    },
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(ValidatorDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            prefixes: {
              account: {
                address: "comnet"
              }
            }
          },
        }
      }
    });
    wrapper.setData({
      isFetching: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(ValidatorDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            prefixes: {
              account: {
                address: "comnet"
              }
            }
          },
        }
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(ValidatorDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            prefixes: {
              account: {
                address: "comnet"
              }
            }
          },
        }
      }
    });
    wrapper.setData({
      delegations: mockDelegations(),
      events: mockTransactions(),
      validator: mockValidator()
    });
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
  });
});
