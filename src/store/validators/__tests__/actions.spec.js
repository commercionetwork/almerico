/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/validators/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getValidators' dispatch action 'fetchValidatorsList'", () => {
    const dispatch = jest.fn();

    actions.getValidators({
      dispatch
    }, "bonded", 1, 19);

    expect(dispatch).toBeCalledWith("fetchValidatorsList", "bonded", 1, 19);
  });

  it("Check if 'actions.fetchValidatorsList' sets validators", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchValidatorsList' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchValidatorsList' when server is unreachable", () => {
    //TODO: implement
  });
});
