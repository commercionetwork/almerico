import enLibrary from '../en';
import itLibrary from '../it';

describe('translations', () => {
  test('if every text category and its values are translated', () => {
    for (const category in enLibrary) {
      expect(itLibrary).toHaveProperty(category);
      for (const messageKey in enLibrary[category]) {
        expect(itLibrary[category]).toHaveProperty(messageKey);
      }
    }
  });
});
