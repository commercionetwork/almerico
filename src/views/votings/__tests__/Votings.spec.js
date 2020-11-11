/* global describe, expect, it, jest */

import Votings from "../index.vue";
import {
  mockProposals
} from "Store/votings/__mocks__/proposals";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/votings/index.vue", () => {
  const actions = {
    getVotings: jest.fn()
  };
  const mockStore = new Vuex.Store({
    modules: {
      votings: {
        namespaced: true,
        actions,
      }
    }
  });
  const mocks = {
    $store: mockStore,
    $t: messageId => messageId
  };

  it("Check if live data are displayed", () => {
    const wrapper = shallowMount(Votings, {
      computed: {
        isFetching: () => false,
        votings: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          votings: {
            live_data: {
              enabled: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(true);
  });

  it("Check if live data are not displayed", () => {
    const wrapper = shallowMount(Votings, {
      computed: {
        isFetching: () => false,
        votings: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          votings: {
            live_data: {
              enabled: false
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="live-data"]').exists()).toBe(false);
  });

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(Votings, {
      computed: {
        isFetching: () => true,
        votings: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          votings: {
            live_data: {
              enabled: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if items are displayed", () => {
    const wrapper = shallowMount(Votings, {
      computed: {
        isFetching: () => false,
        votings: () => mockProposals()
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          votings: {
            live_data: {
              enabled: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(false);
  });

  it("Check if no items message is displayed", () => {
    const wrapper = shallowMount(Votings, {
      computed: {
        isFetching: () => false,
        votings: () => []
      },
      localVue,
      mocks: {
        ...mocks,
        $config: {
          votings: {
            live_data: {
              enabled: true
            },
          }
        }
      }
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="items"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="no-items"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="no-items"]').text()).toEqual('messages.noItems');
  });
});
