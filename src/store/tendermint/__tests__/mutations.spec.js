/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";
import { mockGenesis } from "../__mocks__/genesis";
import { mockNodeInfo } from "../__mocks__/node_info";

describe("store/tendermint/mutations", () => {
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

  it("Check mutations.setGenesis", () => {
    const data = mockGenesis();

    mutations.setGenesis(state, data);

    expect(state.genesis).toEqual(data);
  });

  it("Check mutations.setNodeInfo",()=>{
    const info = mockNodeInfo();

    mutations.setNodeInfo(state, info);

    expect(state.nodeInfo).toEqual(info);
  });
});
