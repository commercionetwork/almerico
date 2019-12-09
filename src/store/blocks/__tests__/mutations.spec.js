/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/blocks/mutations", () => {
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

  it("Check mutations.addNewBlock", () => {
    state.all = [{
      id: 1
    }];
    const data = {
      id: 2
    };
    const expectBlocks = [{
        id: 1
      },
      {
        id: 2
      }
    ];

    mutations.addNewBlock(state, data);

    expect(state.all).toEqual(expectBlocks);
  });

  it("Check mutations.setLastBlock", () => {
    const data = {
      id: 1
    };

    mutations.setLastBlock(state, data);

    expect(state.last).toEqual(data);
  });

  it("Check mutations.deleteBlocks", () => {
    state.all = [{
      id: 1
    }];
    const expectBlocks = [];

    mutations.deleteBlocks(state);

    expect(state.all).toEqual(expectBlocks);
  });
});
