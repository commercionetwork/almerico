/* global describe, beforeEach, it, expect, jest */

import actions from "../actions.js";
import WS from "jest-websocket-mock";
import { EVENTS } from "Constants";
import { mockGenesis } from "../__mocks__/genesis";
import { mockNewBlock } from "../__mocks__/events";

describe("store/tendermint/actions", () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  it("Check if 'actions.subscribeNewBlockEvent' send event subscription", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const server = new WS("ws://localhost:1234");
    const client = new WebSocket("ws://localhost:1234");

    await actions.subscribeNewBlockEvent({ commit, dispatch }, { client: client, event: EVENTS.NEW_BLOCK });
    await expect(server).toReceiveMessage(JSON.stringify(EVENTS.NEW_BLOCK));
    expect(server).toHaveReceivedMessages([JSON.stringify(EVENTS.NEW_BLOCK)]);

    WS.clean();
  });

  it("Check if 'actions.subscribeNewBlockEvent' set last block, fetch pool and txs", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const server = new WS("ws://localhost:1234", { jsonProtocol: true });
    const client = new WebSocket("ws://localhost:1234");

    await actions.subscribeNewBlockEvent({ commit, dispatch }, { client: client, event: EVENTS.NEW_BLOCK });

    const newEvent = mockNewBlock(1);
    server.send(newEvent);
    expect(commit).toHaveBeenCalledWith("blocks/setLastBlock", newEvent.result.data.value.block, {
      root: true
    });
    expect(dispatch).toHaveBeenCalledWith("stake/fetchPool", null, {
      root: true
    });
    const tag = `tx.height=${newEvent.result.data.value.block.header.height}`;
    expect(dispatch).toHaveBeenCalledWith("transactions/fetchTransactions", tag, {
      root: true
    });

    WS.clean();
  });

  it("Check if 'actions.subscribeNewBlockEvent' has an error", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const server = new WS("ws://localhost:1234");
    const client = new WebSocket("ws://localhost:1234");

    await actions.subscribeNewBlockEvent({ commit, dispatch }, { client: client, event: EVENTS.NEW_BLOCK });

    server.error();
    expect(commit).toHaveBeenCalledWith("setMessage", "null");

    WS.clean();
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
