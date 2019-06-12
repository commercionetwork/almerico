/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/stake/mutations", () => {
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

    expect(state.validators).toEqual(data);
  });

  it("Check mutations.addValidators", () => {
    state.validators = [{
      id: 1
    }];
    const data = [{
      id: 2
    }];
    const expectValidators = [{
      id: 1
    }, {
      id: 2
    }];

    mutations.addValidators(state, data);

    expect(state.validators).toEqual(expectValidators);
  });
});
