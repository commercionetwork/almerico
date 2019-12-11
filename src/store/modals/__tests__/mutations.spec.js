/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import { initialState } from "../index";

describe("store/modals/mutations", () => {
  let state = {};

  beforeEach(() => {
    state = { ...initialState };
  });

  it("Check mutations.addModal", () => {
    state.all = [];
    const modal = {
      component: "component"
    };
    const expectValue = [modal];

    mutations.addModal(state, modal);

    expect(state.all).toEqual(expectValue);
  });

  it("Check mutations.removeLastModal", () => {
    state.all = [
      {
        component: "component"
      }
    ];
    const expectValue = [];

    mutations.removeLastModal(state);

    expect(state.all).toEqual(expectValue);
  });

  it("Check mutations.removeAllModals", () => {
    state.all = [
      {
        component: "component"
      }
    ];
    const expectValue = [];

    mutations.removeAllModals(state);

    expect(state.all).toEqual(expectValue);
  });
});
