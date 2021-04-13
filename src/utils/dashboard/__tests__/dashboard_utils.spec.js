import { RANGE } from '@/constants';
import { dateHandler } from '@/utils';
import { mockRateUpdates } from '../../../store/dashboard/__mocks__/rateUpdates';
import PriceHandler from '../PriceHandler';

describe('utils/dashboard', () => {
  const firstRate = {
    rate: '1.000000000000000000',
    date: dateHandler.getUtcDate('2020-01-01'),
  };
  test("if 'PriceHandler' class returns two listings at least", () => {
    const updates = 0;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });

    const listings = new PriceHandler(
      firstRate,
      rateUpdates,
      RANGE.MONTH,
    ).getListingsByRange();

    expect(listings.length).toBe(2);
  });

  test("if 'PriceHandler' class returns the today listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const today = dateHandler.getSubtractedDate(0, 'day');
    const yesterday = dateHandler.getSubtractedDate(1, 'day');

    const listings = new PriceHandler(
      firstRate,
      rateUpdates,
      RANGE.TODAY,
    ).getListingsByRange();

    expect(listings[0].date).toBe(yesterday);
    expect(listings[listings.length - 1].date).toBe(today);
  });

  test("if 'PriceHandler' class returns the week listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(7, 'day');

    const listings = new PriceHandler(
      firstRate,
      rateUpdates,
      RANGE.WEEK,
    ).getListingsByRange();

    expect(listings[0].date).toBe(firstDay);
  });

  test("if 'PriceHandler' class returns the month listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(1, 'month');

    const listings = new PriceHandler(
      firstRate,
      rateUpdates,
      RANGE.MONTH,
    ).getListingsByRange();

    expect(listings[0].date).toBe(firstDay);
  });
});
