/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockBlock
} from "../__mocks__/blocks";

describe("store/blocks/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.fetchBlocks' add blocks", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchBlocks({
      commit,
      dispatch
    });

    expect(dispatch).toHaveBeenCalledWith("fetchBlock", mockResponse.data.block.header.height);
  });

  it("Check if 'actions.fetchBlocks' has an error", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchBlocks({
      commit,
      dispatch
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchBlocks' has a request error", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockErrorRequest = true;

    await actions.fetchBlocks({
      commit,
      dispatch
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchBlocks' when server is unreachable", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockErrorServer = true;

    await actions.fetchBlocks({
      commit,
      dispatch
    });

    expect(commit).toBeCalledWith("setServerReachability", false, {
      root: true
    });
  });

  it("Check if 'actions.fetchBlock' add new block", async () => {
    const commit = jest.fn();

    await actions.fetchBlock({
      commit
    });

    expect(commit).toHaveBeenCalledWith("addNewBlock", mockResponse.data.block);
  });

  it("Check if 'actions.fetchBlock' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchBlock({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchBlock' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchBlock({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchBlock' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchBlock({
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
  requestBlock: height => {
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
            block_meta: {},
            block: mockBlock(new Date(), height)
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
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
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
  }
}));
