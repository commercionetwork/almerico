/* global describe, beforeEach, it, expect */

import mutations from "../mutations";
import {
  initialState
} from "../index";

describe("store/tendermint/mutations", () => {
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

  it("Check mutations.setMessage", () => {
    const message = {
      text: "Check mutations.setMessage",
      type: "type"
    };
    mutations.setMessage(state, message);

    expect(state.message).toEqual(message);
  });

  it("Check mutations.setBlocks", () => {
    const data = [{
      id: 1
    }];

    mutations.setBlocks(state, data);

    expect(state.blocks).toEqual(data);
  });

  it("Check mutations.addBlocks", () => {
    state.blocks = [{
      id: 1
    }];
    const data = [{
      id: 2
    }];
    const expectBlocks = [{
      id: 1
    }, {
      id: 2
    }];

    mutations.addBlocks(state, data);

    expect(state.blocks).toEqual(expectBlocks);
  });

  it("Check mutations.addNewBlock", () => {
    state.blocks = [{
        id: 2
      },
      {
        id: 1
      }
    ];
    const data = {
      id: 3
    };
    const expectBlocks = [{
        id: 3
      },
      {
        id: 2
      },
      {
        id: 1
      }
    ];

    mutations.addNewBlock(state, data);

    expect(state.blocks).toEqual(expectBlocks);
  });

  it("Check mutations.setTransactions", () => {
    const data = [{
      id: 1
    }];

    mutations.setTransactions(state, data);

    expect(state.transactions).toEqual(data);
  });

  it("Check mutations.addTransactions", () => {
    state.transactions = [{
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

    expect(state.transactions).toEqual(expectTxs);
  });
});
