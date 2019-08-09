/* global describe, beforeEach, it, expect, jest */

import {
  txsManager
} from "../../index";
import {
  mockTransaction,
  mockTransactions
} from "../__mocks__/txs"

describe("api/transactions", () => {
  beforeEach(() => {
    mockResponse = null;
    mockError = false;
  });

  it("Check if 'fetchTransaction' returns a transaction or an error", async () => {
    let response = await txsManager.fetchTransaction("hash");

    expect(response.tx).toBe(mockResponse.data);
    expect(response.err).toBeNull();

    mockError = true;
    response = await txsManager.fetchTransaction("hash");

    expect(response.tx).toBeNull();
    expect(response.err).toBe(mockErrorResponse);
  });
  it("Check if 'fetchTransactions' returns a transactions array or an error", async () => {
    let response = await txsManager.fetchTransactions("tag", 1);

    expect(response.txs).toEqual(mockResponse.data.txs);
    expect(response.err).toBeNull();

    mockError = true;
    response = await txsManager.fetchTransactions("tag", 1);

    expect(response.txs).toEqual([]);
    expect(response.err).toBe(mockErrorResponse);
  });
});

let mockResponse = null;
let mockError = false;
const mockErrorResponse = {
  status: 400,
  message: "error"
};

jest.mock("./../api", () => ({
  requestTransactions: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            total_count: "10",
            count: "10",
            page_number: "1",
            page_total: "1",
            limit: "30",
            txs: mockTransactions()
          }
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTransactionByHash: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockTransaction()
        };
        resolve(mockResponse);
      }, 1);
    });
  }
}));
