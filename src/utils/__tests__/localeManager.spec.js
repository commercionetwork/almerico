/* global describe, it, expect */

import { localeManager } from "../index";
import { LOCALES } from "Assets/translations";

describe("utils/localeManger", () => {
  it("Check if the function 'getLongCode' returns the right code", () => {
    const language = LOCALES.IT;
    const response = localeManager.getLongCode(language);
    const expectValue = "it-IT";

    expect(response).toBe(expectValue);
  });

  it("Check if the function 'getLongCode' returns the default locale", () => {
    const language = "";
    const response = localeManager.getLongCode(language);
    const expectValue = "en-EN";

    expect(response).toBe(expectValue);
  });

  it("Check if the function 'getShortCode' returns the right code", () => {
    const language = "it-IT";
    const response = localeManager.getShortCode(language);
    const expectValue = LOCALES.IT;

    expect(response).toBe(expectValue);
  });

  it("Check if the function 'getShortCode' returns the default locale", () => {
    const language = "";
    const response = localeManager.getShortCode(language);
    const expectValue = LOCALES.EN;

    expect(response).toBe(expectValue);
  });
});