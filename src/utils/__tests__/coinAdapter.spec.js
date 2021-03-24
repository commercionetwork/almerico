import { coinAdapter } from "../index";

describe("utils/coinAdapter", () => {
  test('if function "format" returns the coin converted', () => {
    const balance = {
      denom: "ucommercio",
      amount: 123456000000
    };
    const expectedValue = "12345600 com";

    const convertedCoin = coinAdapter.format(balance);

    expect(convertedCoin.replace(/[,.]/g, "")).toBe(expectedValue);
  });

  test('if function "format" returns the coin not converted', () => {
    const balance = {
      denom: "commercio",
      amount: "123456.000000"
    };
    const expectedValue = "123456 commercio";

    const convertedCoin = coinAdapter.format(balance);

    expect(convertedCoin.replace(/[,.]/g, "")).toBe(expectedValue);
  });

  test('if function "format" does not convert when argument is bad', () => {
    let balance = {
      denom: "ucommercio"
    };

    let convertedCoin = coinAdapter.format(balance);

    expect(convertedCoin).toBe(undefined);

    balance = {
      amount: "123456000000"
    };

    convertedCoin = coinAdapter.format(balance);

    expect(convertedCoin).toBe(undefined);
  });
});