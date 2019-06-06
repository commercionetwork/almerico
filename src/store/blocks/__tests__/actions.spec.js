/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/blocks/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getBlocks' dispatch action 'fetchBlocksList'", () => {
    const dispatch = jest.fn();

    actions.getBlocks({
      dispatch
    }, 10);

    expect(dispatch).toBeCalledWith("fetchBlocksList", 10);
  });

  it("Check if 'actions.fetchBlocksList' sets blocks", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchBlocksList' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchBlocksList' when server is unreachable", () => {
    //TODO: implement
  });
});
