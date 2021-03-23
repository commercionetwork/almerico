import { regExpBuilder } from '../index';

describe('utils/regExpBuilder', () => {
  test("if 'getAddressRegExp' function returns a regular expression to test the blockchain addresses", () => {
    const mockAccountAddress =
      'did:com:1ttxcnevaxlk58u4uuec2n7cm44rk9tsgc8tn6m';
    const accountPrefix = 'did:com:';
    const testAccount = regExpBuilder
      .getAddressRegExp(accountPrefix)
      .test(mockAccountAddress);

    expect(testAccount).toBe(true);

    const mockValidatorAddress =
      'did:com:valoper1ttxcnevaxlk58u4uuec2n7cm44rk9tsgmyj4hg';
    const validatorPrefix = 'did:com:valoper';
    const testValidator = regExpBuilder
      .getAddressRegExp(validatorPrefix)
      .test(mockValidatorAddress);

    expect(testValidator).toBe(true);
  });

  test("if 'getHashRegExp' function returns a regular expression to test a transaction hash", () => {
    const mockHash =
      '221BC4E24DBE7DEF9C2244B8E13FEA3D4A303F5EC37E10D99511129B1B470CC1';
    const testHash = regExpBuilder.getHashRegExp().test(mockHash);

    expect(testHash).toBe(true);
  });

  test("if 'getHeightRegExp' function returns a regular expression to test a block height", () => {
    const mockHeight = '811';
    const testHeight = regExpBuilder.getHeightRegExp().test(mockHeight);

    expect(testHeight).toBe(true);
  });

  test("if 'getUrlRegExp' function returns a regular expression to test a web url", () => {
    const mockUrl = 'https://testnet.commercio.network';
    let testUrl = regExpBuilder.getUrlRegExp().test(mockUrl);

    expect(testUrl).toBe(true);

    const mockWrongUrl = 'testnet.commercio.network';
    testUrl = regExpBuilder.getUrlRegExp().test(mockWrongUrl);

    expect(testUrl).toBe(false);
  });
});
