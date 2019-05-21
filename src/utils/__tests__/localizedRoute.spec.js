/* global describe, it, expect */

import { localizedRoute } from "../index";
import { LOCALES } from "Assets/translations";
import { ROUTE_NAMES } from "Constants";

describe("utils/localizedRoute", () => {
  it("Check if the function returns the correct route", () => {
    const route = ROUTE_NAMES.HOME;
    const locale = LOCALES.IT;
    const response = localizedRoute(route, locale);
    const expectValue = {
      name: route,
      params: { lang: locale }
    };

    expect(response).toEqual(expectValue);
  });

  it("Check if the function returns the default locale route", () => {
    const route = ROUTE_NAMES.HOME;
    const response = localizedRoute(route);
    const expectValue = {
      name: route,
      params: { lang: LOCALES.EN }
    };

    expect(response).toEqual(expectValue);
  });
});
