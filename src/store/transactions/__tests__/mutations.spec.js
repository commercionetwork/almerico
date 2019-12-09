/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/transactions/mutations", () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState
    };
  });

  it("Check mutations.startLoading", () => {
    state.message = "message";

    mutations.startLoading(state);

    expect(state.isFetching).toBeTruthy();
    expect(state.message).toBe("");
  });

  it("Check mutations.stopLoading", () => {
    state.isFetching = true;

    mutations.stopLoading(state);

    expect(state.isFetching).toBeFalsy();
  });

  it("Check mutations.setMessage", () => {
    const message = "mutations.setMessage error";

    mutations.setMessage(state, message);

    expect(state.message).toEqual(message);
  });

  it("Check mutations.addTransactions", () => {
    state.all = [{
      id: 1
    }];
    const data = [{
      id: 2
    }];
    const expectTxs = [{
      id: 1
    }, {
      id: 2
    }];

    mutations.addTransactions(state, data);

    expect(state.all).toEqual(expectTxs);
  });

  it("Check mutations.setDetails", () => {
    const data = {
      id: 1
    };

    mutations.setDetails(state, data);

    expect(state.details).toEqual(data);
  });
});
