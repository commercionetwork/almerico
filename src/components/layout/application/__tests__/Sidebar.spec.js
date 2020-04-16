/* global describe, expect, it, jest */

import Sidebar from "../Sidebar.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";
import clickOutside from "Setup/directives/clickOutside";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("components/layout/application/Sidebar.vue", () => {
  const mocks = {
    $i18n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    closeSidebar: jest.fn()
  };
  const computed = {
    chainId: () => "chainId"
  };

  it("Check if section links are displayed", () => {
    const wrapper = shallowMount(Sidebar, {
      computed: {
        ...computed,
      },
      directives: {
        'click-outside': clickOutside
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            enabled: true
          },
          transactions: {
            enabled: true
          },
          validators: {
            enabled: true
          },
          votings: {
            enabled: true
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="link-blocks"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="link-transactions"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="link-validators"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="link-votings"]').exists()).toBe(true);
  });

  it("Check if section links are not displayed", () => {
    const wrapper = shallowMount(Sidebar, {
      computed: {
        ...computed,
      },
      directives: {
        'click-outside': clickOutside
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          blocks: {
            enabled: false
          },
          transactions: {
            enabled: false
          },
          validators: {
            enabled: false
          },
          votings: {
            enabled: false
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="link-blocks"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="link-transactions"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="link-validators"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="link-votings"]').exists()).toBe(false);
  });
});
