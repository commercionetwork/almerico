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
    mutations.startLoading(state);

    expect(state.isFetching).toBeTruthy();
  });

  it("Check mutations.stopLoading", () => {
    state.isFetching = true;

    mutations.stopLoading(state);

    expect(state.isFetching).toBeFalsy();
  });

  it("Check mutations.setTransactions", () => {
    const data = [{
      id: 1
    }];

    mutations.setTransactions(state, data);

    expect(state.all).toEqual(data);
  });

  it("Check mutations.addTransactions", () => {
    state.all = [{
      id: 1
    }];
    const data = [{
      id: 2
    }];
    const expectAll = [{
      id: 1
    }, {
      id: 2
    }];

    mutations.addTransactions(state, data);

    expect(state.all).toEqual(expectAll);
  });
});
