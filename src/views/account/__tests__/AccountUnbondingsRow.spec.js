/* global describe, expect, it, jest */

import AccountUnbondingsRow from "../AccountUnbondingsRow.vue";
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

describe("views/account/AccountUnbondingsRow.vue", () => {
  const methods = {
    getMoniker: jest.fn()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId,
    $config: {
      generic: {
        coin: {
          name: {
            long: "commercio"
          }
        }
      }
    }
  };
  const props = {
    delegation: mockConvertedUnbonding()
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(AccountUnbondingsRow, {
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      isFetching: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(AccountUnbondingsRow, {
      localVue,
      methods,
      mocks,
      propsData: {
        ...props
      }
    });
    wrapper.setData({
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(AccountUnbondingsRow, {
      localVue,
      methods,
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
