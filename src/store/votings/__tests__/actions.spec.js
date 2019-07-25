/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import {
  mockProposals
} from "../__mocks__/proposals";

describe("store/votings/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.getVotings' dispatch action 'fetchVotings'", () => {
    const dispatch = jest.fn();

    actions.getVotings({
      dispatch
    }, {
      voter: "voter",
      depositor: "depositor",
      status: "passed"
    });

    expect(dispatch).toBeCalledWith("fetchVotings", {
      voter: "voter",
      depositor: "depositor",
      status: "passed"
    });
  });

  it("Check if 'actions.fetchVotings' sets votings", async () => {
    const commit = jest.fn();

    await actions.fetchVotings({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setVotings", mockResponse.data);
  });

  it("Check if 'actions.fetchVotings' has an error", async () => {
    const commit = jest.fn();
    mockError = true;

    await actions.fetchVotings({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", mockErrorResponse.response.data.error);
  });

  it("Check if 'actions.fetchVotings' has a request error", async () => {
    const commit = jest.fn();
    mockErrorRequest = true;

    await actions.fetchVotings({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setMessage", "Request error");
  });

  it("Check 'actions.fetchVotings' when server is unreachable", async () => {
    const commit = jest.fn();
    mockErrorServer = true;

    await actions.fetchVotings({
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
  requestProposals: () => {
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
          data: mockProposals()
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
