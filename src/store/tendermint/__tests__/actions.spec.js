/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockGenesis
} from "../__mocks__/genesis";

describe("store/tendermint/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchGenesis' set genesis", async () => {
    const commit = jest.fn();

    await actions.fetchGenesis({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setGenesis", mockResponse.data.result);
  });

  it("Check if 'actions.fetchGenesis' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchGenesis({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchGenesis' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchGenesis({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchGenesis' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchGenesis({
      commit
    });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
  });
});

let mockResponse = null;

let mockError = false;
const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: "error",
    },
    status: 400
  }
};
let mockErrorRequest = false;
const mockErrorRequestResponse = {
  request: {},
  response: undefined
};
let mockErrorServer = false;

jest.mock("./../api", () => ({
  requestGenesis: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            jsonrpc: "2.0",
            id: "",
            result: mockGenesis()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  }
}));
