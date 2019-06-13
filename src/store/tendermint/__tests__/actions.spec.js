/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockBlock,
  mockBlocks
} from "../__mocks__/blocks";
import {
  mockTransactions
} from "../__mocks__/transactions";

describe("store/tendermint/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.getBlocks' dispatch action 'fetchBlocks'", () => {
    const dispatch = jest.fn();

    actions.getBlocks({
      dispatch
    }, 10);

    expect(dispatch).toBeCalledWith("fetchBlocks", 10);
  });

  it("Check if 'actions.fetchBlocks' sets blocks", async () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchBlocks' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchBlocks({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response);
  });

  it("Check 'actions.fetchBlocks' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchBlocks({
      commit
    });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
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

  it("Check if 'actions.fetchTransactions' sets transactions", async () => {
    //TODO: implement
  });

  it("Check if 'actions.fetchTransactions' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response);
  });

  it("Check 'actions.fetchTransactions' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
  });
});

const mockErrorResponse = {
  response: {
    data: {
      code: 400,
      data: {
        param: "param"
      },
      message: "error"
    }
  }
};
let mockError = false;
let mockErrorServer = false;
let mockResponse = null;

jest.mock("./../api", () => ({
  requestLastBlock: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: mockBlock(new Date(), 100)
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestBlockChain: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            result: {
              block_metas: mockBlocks()
            }
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTransactions: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: mockTransactions()
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
