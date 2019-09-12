/* global describe, expect, it, jest */

import TransactionDetails from "../TransactionDetails.vue";
import {
  mockTransaction
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("views/transactions/TransactionDetails.vue", () => {
  const methods = {
    fetchTransaction: jest.fn()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      computed: {
        isFetching: () => true,
        message: () => "",
        transaction: () => null,
        txId: () => "1"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [
              {
                name: "commercio",
                symbol: "CNT",
                denom: "ucommercio",
                exponent: 6,
                stakeable: true
              }
            ]
          },
          transaction_details: {
            msgs_details: true
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      computed: {
        isFetching: () => false,
        message: () => "error",
        transaction: () => null,
        txId: () => "1"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [
              {
                name: "commercio",
                symbol: "CNT",
                denom: "ucommercio",
                exponent: 6,
                stakeable: true
              }
            ]
          },
          transaction_details: {
            msgs_details: true
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      computed: {
        isFetching: () => false,
        message: () => "",
        transaction: () => mockTransaction(),
        txId: () => "1"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [
              {
                name: "commercio",
                symbol: "CNT",
                denom: "ucommercio",
                exponent: 6,
                stakeable: true
              }
            ]
          },
          transaction_details: {
            msgs_details: true
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });

  it("Check if transaction messages are displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      computed: {
        isFetching: () => false,
        message: () => "",
        transaction: () => mockTransaction(),
        txId: () => "1"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [
              {
                name: "commercio",
                symbol: "CNT",
                denom: "ucommercio",
                exponent: 6,
                stakeable: true
              }
            ]
          },
          transaction_details: {
            msgs_details: true
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="msgs-details"]').exists()).toBe(true);
  });

  it("Check if transaction messages are not displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      computed: {
        isFetching: () => false,
        message: () => "",
        transaction: () => mockTransaction(),
        txId: () => "1"
      },
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [
              {
                name: "commercio",
                symbol: "CNT",
                denom: "ucommercio",
                exponent: 6,
                stakeable: true
              }
            ]
          },
          transaction_details: {
            msgs_details: false
          }
        }
      },
      router
    });

    expect(wrapper.find('[data-test="msgs-details"]').exists()).toBe(false);
  });
});
