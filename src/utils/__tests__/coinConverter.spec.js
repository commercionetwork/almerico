/* global describe, it, expect */

import {
  coinConverter
} from "../index";

describe("utils/coinConverter", () => {
  it("Check if the function returns the expected object from coin beginning with the letter 'u'", () => {
    const coin = {
      denom: "ucommercio",
      amount: "1000000"
    };
    const expectValue = {
      denom: "commercio",
      amount: 1
    };

    const response = coinConverter(coin);

    expect(response).toEqual(expectValue);
  });

  it("Check if the function returns the expected object from coin beginning with a letter other than 'u'", () => {
    const coin = {
      denom: "commercio",
      amount: "1"
    };
    const expectValue = {
      denom: "commercio",
      amount: 1
    };

    const response = coinConverter(coin);

    expect(response).toEqual(expectValue);
  });
});
