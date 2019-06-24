/* global describe, it, expect */

import {
  arrayManager
} from "../index";

describe("utils/arrayManager", () => {
  it("Check if the function 'uniqueByKey' returns an array without duplicated", () => {
    const a = [{
      id: 1
    }, {
      id: 1
    }];
    const expectValue = [{
      id: 1
    }];

    const response = arrayManager.uniqueByKey(a, JSON.stringify);

    expect(response).toEqual(expectValue);
  });
});
