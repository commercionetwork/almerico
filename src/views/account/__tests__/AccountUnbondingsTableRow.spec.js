/* global describe, expect, it, jest */

import AccountUnbondingsTableRow from "../AccountUnbondingsTableRow.vue";
import api from "Store/validators/api";
import {
  mockConvertedUnbonding
} from "Store/account/__mocks__/unbondings";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("views/account/AccountUnbondingsTableRow.vue", () => {
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId,
    $config: {
      generic: {
        coins: [{
          name: "commercio",
          symbol: "CNT",
          denom: "ucommercio",
          exponent: 6,
          stakeable: true
        }]
      }
    }
  };
  const props = {
    unbonding: mockConvertedUnbonding()
  };
  api.requestValidator = jest.fn();

  it("Check if loading message is displayed", async () => {
    const wrapper = shallowMount(AccountUnbondingsTableRow, {
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: true,
      hasError: false
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", async () => {
    const wrapper = shallowMount(AccountUnbondingsTableRow, {
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });
    await wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(AccountUnbondingsTableRow, {
      localVue,
      mocks,
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });
});
