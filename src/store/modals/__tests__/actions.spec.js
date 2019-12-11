/* global describe, it, expect, jest */

import actions from "../actions.js";

describe("store/modals/actions.js", () => {
  it("Check if actions.addModal commit mutation 'addModal'", () => {
    const commit = jest.fn();
    const modal = {
      component: "component"
    };

    actions.addModal({ commit }, modal);

    expect(commit).toBeCalledWith("addModal", modal);
  });

  it("Check if actions.removeLastModal commit mutation 'removeLastModal'", () => {
    const commit = jest.fn();

    actions.removeLastModal({ commit });

    expect(commit).toBeCalledWith("removeLastModal");
  });

  it("Check if actions.removeAllModals commit mutation 'removeAllModals'", () => {
    const commit = jest.fn();

    actions.removeAllModals({ commit });

    expect(commit).toBeCalledWith("removeAllModals");
  });
});
