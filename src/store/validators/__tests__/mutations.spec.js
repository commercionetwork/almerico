/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/validators/mutations", () => {
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

  it("Check mutations.setValidators", () => {
    const data = [{
      id: 1
    }];

    mutations.setValidators(state, data);

    expect(state.all).toEqual(data);
  });
});
