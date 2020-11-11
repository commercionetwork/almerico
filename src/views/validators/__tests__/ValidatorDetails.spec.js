/* global describe, expect, it, jest */

import ValidatorDetails from "../ValidatorDetails.vue";
import api from "Store/validators/api";
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
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/validators/ValidatorDetails.vue", () => {
  const computed = {
    events: () => mockTransactions(),
    transactions: () => mockTransactions(),
    validatorAddress: () => "comnetvaloper1t8xx727yrvep0w7ylunz609vn2sarf5ckrval5"
  };
  const actions = {
    fetchBlocks: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      blocks: {
        namespaced: true,
        actions,
      }
    }
  });
  const mocks = {
    $store: mockStore,
    $t: messageId => messageId
  };
  api.requestValidator = jest.fn();
  api.requestValidatorPictures = jest.fn();
  api.requestValidatorDelegations = jest.fn();

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(ValidatorDetails, {
      computed: {
        ...computed,
        isFetching: () => true,
        hasError: () => false
      },
      localVue,
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

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(ValidatorDetails, {
      computed: {
        ...computed,
        isFetching: () => false,
        hasError: () => true
      },
      localVue,
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

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", async () => {
    const wrapper = shallowMount(ValidatorDetails, {
      computed: {
        ...computed,
        isFetching: () => false,
        hasError: () => false
      },
      localVue,
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
    await wrapper.setData({
      delegations: mockDelegations(),
      validator: mockValidator()
    });
    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
  });
});
