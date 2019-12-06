/* global describe, it, expect */

import {
  arrayManager
} from "../index";

describe("utils/arrayManager", () => {
  it("Check if the function 'groupBy' returns an objetc of objects grouped by property", () => {
    const a = [{
      id: 1,
      qt: 1
    }, {
      id: 1,
      qt: 2
    }, {
      id: 2,
      qt: 1
    }];
    const expectValue = {
      1: [{
        id: 1,
        qt: 1
      }, {
        id: 1,
        qt: 2
      }],
      2: [{
        id: 2,
        qt: 1
      }]
    };

    const response = arrayManager.groupBy(a, 'id');

    expect(response).toEqual(expectValue);
  });

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

  it("Check if the function 'uniqueValuesArrayFromObjectsArray' returns an array without duplicated", () => {
    const a = [{
      id: 1
    }, {
      id: 1
    }];
    const expectValue = [{
      id: 1
    }];

    const response = arrayManager.uniqueValuesArrayFromObjectsArray(a);

    expect(response).toEqual(expectValue);
  });
});
