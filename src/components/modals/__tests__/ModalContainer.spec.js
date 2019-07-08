/* global describe, expect, it, jest */

import ModalContainer from "../index.vue";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

const mockChildComponent = localVue.component("child-component", {
  props: ["message"],
  template: "{{message}}"
})

describe("Components/modals/index.vue", () => {
  const methods = {
    onCloseRemoveAllModals: jest.fn()
  };

  it("Check if modal is displayed", () => {
    const wrapper = shallowMount(ModalContainer, {
      computed: {
        hasModal: () => true,
        modal: () => ({
          dialogProps: {
            size: ""
          }
        })
      },
      localVue,
      methods
    });

    expect(wrapper.find('[data-test="modal"]').exists()).toBeTruthy();
  });

  it("Check if modal is not displayed", () => {
    const wrapper = shallowMount(ModalContainer, {
      computed: {
        hasModal: () => false,
        modal: () => null
      },
      localVue,
      methods
    });

    expect(wrapper.find('[data-test="modal"]').exists()).toBeFalsy();
  });

  it("Check if header is not displayed", () => {
    const wrapper = shallowMount(ModalContainer, {
      computed: {
        hasModal: () => true,
        modal: () => ({
          dialogProps: {
            size: "",
            noHeader: true
          }
        })
      },
      localVue,
      methods
    });

    expect(wrapper.find('[data-test="header"]').exists()).toBeFalsy();
  });

  it("Check if control box is not displayed", () => {
    const wrapper = shallowMount(ModalContainer, {
      computed: {
        hasModal: () => true,
        modal: () => ({
          dialogProps: {
            size: "",
            noHeader: false,
            noControlBox: true
          }
        })
      },
      localVue,
      methods
    });

    expect(wrapper.find('[data-test="control-box"]').exists()).toBeFalsy();
  });

  it("Check if modal shows modal component", () => {
    const message = "message";

    const wrapper = shallowMount(ModalContainer, {
      computed: {
        hasModal: () => true,
        modal: () => ({
          dialogProps: {
            size: ""
          },
          componentProps: {
            message
          },
          component: mockChildComponent
        })
      },
      localVue,
      methods
    });

    expect(wrapper.find('[data-test="component"]').exists()).toBeTruthy();
    expect(wrapper.html()).toContain(message);
  });
});
