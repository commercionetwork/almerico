/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/validators/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getValidators' dispatch action 'fetchValidators'", () => {
    const dispatch = jest.fn();

    actions.getValidators({
      dispatch
    }, {
      status: "bonded",
      page: 1,
      limit: 10
    });

    expect(dispatch).toBeCalledWith("fetchValidators", {
      status: "bonded",
      page: 1,
      limit: 10
    });
  });

  it("Check if 'actions.fetchValidators' sets validators", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchValidators' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchValidators' when server is unreachable", () => {
    //TODO: implement
  });
});
