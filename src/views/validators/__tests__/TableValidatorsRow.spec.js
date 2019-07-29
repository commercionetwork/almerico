/* global describe, expect, it */

import TableValidatorsRow from "../TableValidatorsRow.vue";
import {
  mockPool
} from "Store/stake/__mocks__/pool";
import {
  mockValidator
} from "Store/validators/__mocks__/validators";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("views/validators/TableValidatorsRow.vue", () => {
  const computed = {
    pool: () => mockPool()
  };
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    validator: mockValidator(),
    rank: 1
  };

  it("Check if columns of validators table row are displayed", () => {
    const wrapper = shallowMount(TableValidatorsRow, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coin: {
              name: {
                long: "ucommercio",
                short: "commercio",
                ticker: "cmc"
              }
            }
          },
          validators: {
            table: {
              columns: {
                ordering: true,
                name: true,
                voting_power: true,
                share_percentage: true,
                commission: true
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
  });

  it("Check if columns of validators table row are not displayed", () => {
    const wrapper = shallowMount(TableValidatorsRow, {
      computed,
      localVue,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coin: {
              name: {
                long: "ucommercio",
                short: "commercio",
                ticker: "cmc"
              }
            }
          },
          validators: {
            table: {
              columns: {
                ordering: false,
                name: false,
                voting_power: false,
                share_percentage: false,
                commission: false
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
  });
});
