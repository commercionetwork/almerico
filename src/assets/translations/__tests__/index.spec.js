/* global describe, expect, it */

import enLibrary from "../en";
import itLibrary from "../it";

describe("translations", () => {
  it("Check if every text category and its values are translated", () => {
    for (let category in enLibrary) {
      expect(itLibrary).toHaveProperty(category);
      for (let messageKey in enLibrary[category]) {
        expect(itLibrary[category]).toHaveProperty(messageKey);
      }
    }
  });
});
