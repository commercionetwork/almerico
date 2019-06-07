/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/votings/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getVotings' dispatch action 'fetchVotings'", () => {
    const dispatch = jest.fn();

    actions.getVotings({
      dispatch
    }, {
      voter: "voter",
      depositor: "depositor",
      status: "passed"
    });

    expect(dispatch).toBeCalledWith("fetchVotings", {
      voter: "voter",
      depositor: "depositor",
      status: "passed"
    });
  });

  it("Check if 'actions.fetchVotings' sets votings", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchVotings' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchVotings' when server is unreachable", () => {
    //TODO: implement
  });
});
