/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockPool
} from "../__mocks__/pool";

describe("store/stake/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchPool' sets pool", async () => {
    const commit = jest.fn();

    await actions.fetchPool({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setPool", mockResponse.data);
  });

  it("Check if 'actions.fetchPool' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchPool({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchPool' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchPool({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchPool' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchPool({
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
  requestPool: () => {
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
          data: mockPool()
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
