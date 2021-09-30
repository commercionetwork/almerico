import { RANGE } from '@/constants';
import { dateHandler } from '@/utils';
import { mockRateUpdates } from '@/store/dashboard/__mocks__/listings';
import priceHandler from '../priceHandler';

describe('views/dashboard/helpers/priceHandler', () => {
  const firstRate = {
    rate: '1.000000000000000000',
    date: dateHandler.getUtcDate('2020-01-01'),
  };

  test("if 'getListingsByRange' method return two listings at least", () => {
    const updates = 0;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });

    const listings = priceHandler.getListingsByRange({
      firstRate: firstRate,
      rateUpdates: rateUpdates,
      range: RANGE.MONTH,
    });

    expect(listings.length).toBe(2);
  });

  test("if 'getListingsByRange' method return the today listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const today = dateHandler.getSubtractedDate(0, 'day');
    const yesterday = dateHandler.getSubtractedDate(1, 'day');

    const listings = priceHandler.getListingsByRange({
      firstRate: firstRate,
      rateUpdates: rateUpdates,
      range: RANGE.TODAY,
    });

    expect(listings[0].date).toBe(yesterday);
    expect(listings[listings.length - 1].date).toBe(today);
  });

  test("if 'getListingsByRange' method return the week listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(7, 'day');

    const listings = priceHandler.getListingsByRange({
      firstRate: firstRate,
      rateUpdates: rateUpdates,
      range: RANGE.WEEK,
    });

    expect(listings[0].date).toBe(firstDay);
  });

  test("if 'getListingsByRange' method return the month listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(1, 'month');

    const listings = priceHandler.getListingsByRange({
      firstRate: firstRate,
      rateUpdates: rateUpdates,
      range: RANGE.MONTH,
    });

    expect(listings[0].date).toBe(firstDay);
  });
});
