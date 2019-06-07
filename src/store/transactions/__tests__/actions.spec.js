/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/transactions/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getTransactions' dispatch action 'fetchTransactions'", () => {
    const dispatch = jest.fn();

    actions.getTransactions({
      dispatch
    }, {
      action: "send",
      sender: "sender",
      page: 1,
      limit: 10
    });

    expect(dispatch).toBeCalledWith("fetchTransactions", {
      action: "send",
      sender: "sender",
      page: 1,
      limit: 10
    });
  });

  it("Check if 'actions.fetchTransactions' sets transactions", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchTransactions' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchTransactions' when server is unreachable", () => {
    //TODO: implement
  });
});
