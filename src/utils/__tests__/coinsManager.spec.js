/* global describe, it, expect */

import {
  coinsManager
} from "../index";

describe("utils/coinsManager", () => {
  it("Check if the function returns the expected object from coin beginning with the letter 'u'", () => {
    const coin = "ucommercio";
    const exponent = 6;
    const amount = 1000000;
    const expectValue = {
      amount: 1,
      denom: "commercio"
    };

    const response = coinsManager(coin, exponent, amount);

    expect(response).toEqual(expectValue);
  });

  it("Check if the function returns the expected object from coin beginning with a letter other than 'u'", () => {
    const coin = "commercio";
    const exponent = 6;
    const amount = 1;
    const expectValue = {
      denom: "commercio",
      amount: 1
    };

    const response = coinsManager(coin, exponent, amount);

    expect(response).toEqual(expectValue);
  });
});
