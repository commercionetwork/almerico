/* global describe, expect, it */

import VotingDetailsHeader from "../VotingDetailsHeader.vue";
import {
  mockProposal
} from "Store/votings/__mocks__/proposals";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/votings/VotingDetailsHeader.vue", () => {
  const mocks = {
    $i18n: messageId => messageId,
    $n: messageId => messageId,
    $t: messageId => messageId
  };
  const props = {
    voting: mockProposal()
  }

  it("Check if header rows are displayed", () => {
    const wrapper = shallowMount(VotingDetailsHeader, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [{
              name: "commercio",
              symbol: "CNT",
              denom: "ucommercio",
              exponent: 6,
              stakeable: true
            }]
          },
          voting_details: {
            rows: {
              title: true,
              type: true,
              status: true,
              submit_time: true,
              deposit_end_time: true,
              deposit: true,
              voting_start_time: true,
              voting_end_time: true,
              description: true
            }
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="row-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-type"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-status"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-submit-time"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-deposit-end-time"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-deposit"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-voting-start-time"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-voting-end-time"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="row-description"]').exists()).toBe(true);
  });

  it("Check if header rows are not displayed", () => {
    const wrapper = shallowMount(VotingDetailsHeader, {
      localVue,
      mocks: {
        ...mocks,
        $config: {
          generic: {
            coins: [{
              name: "commercio",
              symbol: "CNT",
              denom: "ucommercio",
              exponent: 6,
              stakeable: true
            }]
          },
          voting_details: {
            rows: {
              title: false,
              type: false,
              status: false,
              submit_time: false,
              deposit_end_time: false,
              deposit: false,
              voting_start_time: false,
              voting_end_time: false,
              description: false
            }
          }
        }
      },
      propsData: {
        ...props
      }
    });

    expect(wrapper.find('[data-test="row-title"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-type"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-status"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-submit-time"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-deposit-end-time"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-deposit"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-voting-start-time"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-voting-end-time"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="row-description"]').exists()).toBe(false);
  });
});
