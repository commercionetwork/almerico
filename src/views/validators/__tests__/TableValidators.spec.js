/* global describe, expect, it */

import TableValidators from "../TableValidators.vue";
import {
  mockValidators
} from "Store/validators/__mocks__/validators";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/validators/TableValidators.vue", () => {
  const mocks = {
    $t: messageId => messageId
  };
  const props = {
    validators: mockValidators()
  };

  it("Check if columns of validators table are displayed", () => {
    const wrapper = shallowMount(TableValidators, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            table: {
              columns: {
                ordering: true,
                name: true,
                voting_power: true,
                share_percentage: true,
                commission: true,
                blocks: true
              }
            }
          },
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="table-column-ordering"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-name"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-power"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-share"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-commission"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="table-column-blocks"]').exists()).toBe(true);
  });

  it("Check if columns of validators table are not displayed", () => {
    const wrapper = shallowMount(TableValidators, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          validators: {
            table: {
              columns: {
                ordering: false,
                name: false,
                voting_power: false,
                share_percentage: false,
                commission: false,
                blocks: false
              }
            }
          },
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="table-column-ordering"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-name"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-power"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-share"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-commission"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="table-column-blocks"]').exists()).toBe(false);
  });
});
