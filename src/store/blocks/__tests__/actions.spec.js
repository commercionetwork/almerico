/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockBlock
} from "../__mocks__/blocks";

describe("store/blocks/actions", () => {
  beforeEach(() => {
    mockError = false;
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
  requestBlock: height => {
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
