/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import { mockNodeInfo } from "../__mocks__/node_info";

describe("store/chain/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchNodeInfo' set node info", async () => {
    const commit = jest.fn();

    await actions.fetchNodeInfo({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setNodeInfo", mockResponse.data);
  });

  it("Check if 'actions.fetchNodeInfo' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchNodeInfo({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchNodeInfo' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchNodeInfo({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchNodeInfo' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchNodeInfo({
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
  requestNodeInfo: () => {
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
          data: mockNodeInfo()
        };
        resolve(mockResponse);
      }, 1)
    });
  }
}));
