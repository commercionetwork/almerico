/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";

describe("store/tendermint/actions", () => {
  beforeEach(() => {});

  it("Check if 'actions.getBlocks' dispatch action 'fetchBlocks'", () => {
    const dispatch = jest.fn();

    actions.getBlocks({
      dispatch
    }, 10);

    expect(dispatch).toBeCalledWith("fetchBlocks", 10);
  });

  it("Check if 'actions.fetchBlocks' sets blocks", () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchBlocks' has an error", () => {
    //TODO: implement
  });

  it("Check 'actions.fetchBlocks' when server is unreachable", () => {
    //TODO: implement
  });

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
