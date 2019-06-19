/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockBlock
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

  it("Check if 'actions.fetchTransactions' updates transactions", async (done) => {
    const commit = jest.fn();

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("addTransactions", mockResponse.data);
    done();
  });

  it("Check if 'actions.fetchTransactions' has an error", async (done) => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
    done();
  });

  it("Check 'actions.fetchTransactions' when server is unreachable", async (done) => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchTransactions({
      commit
    });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
    done();
  });
});

const mockErrorResponse = {
  response: {
    data: {
      error: "error",
    },
    status: 400
  }
};
let mockError = false;
let mockErrorServer = false;
let mockResponse = null;

jest.mock("./../api", () => ({
  requestBlock: () => {
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
            block_meta: {},
            block: mockBlock(new Date(), 100)
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
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
          data: {
            block_meta: {},
            block: mockBlock(new Date(), 100)
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
