import { RANGE } from '@/constants';
import { dateHandler } from '@/utils';
import { shuffle } from 'lodash';
import { mockRateUpdates } from '../../../../store/dashboard/__mocks__/listings';
import priceChartHelper from '../priceChartHelper';

describe('views/dashboard/helpers/priceChartHelper', () => {
  const startingDate = dateHandler.getUtcDate('2020/2/1');

  test('if "getAllSortedListings" method add first rate, order items by date and return objects with "rate" and "date" keys', () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = shuffle(mockRateUpdates({ updates, year, month, day }));
    const all = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    expect(all[0].price).toBe(1);
    expect(all[0].date).toBe(startingDate);
    all.forEach((el, i) => {
      const index = i + 1;
      if (index === all.length) return;
      expect(new Date(el.date).getMilliseconds()).toBeLessThanOrEqual(
        new Date(all[index].date).getMilliseconds(),
      );
    });
    all.forEach((el) => {
      expect(Object.keys(el)).toStrictEqual(['price', 'date']);
    });
  });

  test('if "getListingsByRange" method return two listings at least', () => {
    const rateUpdates = [];
    const listings = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    const res = priceChartHelper.getListingsByRange({
      listings,
      range: RANGE.MONTH,
    });

    expect(res.length).toBe(2);
  });

  test('if "getListingsByRange" method return the wanted 2 listings when there are 1 updates', () => {
    const rateUpdates = mockRateUpdates();
    const listings = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    const res = priceChartHelper.getListingsByRange({
      listings,
      range: RANGE.MONTH,
    });

    expect(res.length).toBe(2);
    res.forEach((el, i) => {
      expect(el.price).toBe(listings[i].price);
    });
  });

  test("if 'getListingsByRange' method return the today listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(1, 'day');
    const today = dateHandler.getSubtractedDate(0, 'day');

    const listings = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    const res = priceChartHelper.getListingsByRange({
      listings,
      range: RANGE.TODAY,
    });

    expect(res[0].date).toBe(firstDay);
    expect(res[res.length - 1].date).toBe(today);
  });

  test("if 'getListingsByRange' method return the week listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(7, 'day');
    const today = dateHandler.getSubtractedDate(0, 'day');

    const listings = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    const res = priceChartHelper.getListingsByRange({
      listings,
      range: RANGE.WEEK,
    });

    expect(res[0].date).toBe(firstDay);
    expect(res[res.length - 1].date).toBe(today);
  });

  test("if 'getListingsByRange' method return the month listings", () => {
    const updates = 5;
    const year = 2021;
    const month = 1;
    const day = 1;
    const rateUpdates = mockRateUpdates({ updates, year, month, day });
    const firstDay = dateHandler.getSubtractedDate(1, 'month');
    const today = dateHandler.getSubtractedDate(0, 'day');

    const listings = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    const res = priceChartHelper.getListingsByRange({
      listings,
      range: RANGE.MONTH,
    });

    expect(res[0].date).toBe(firstDay);
    expect(res[res.length - 1].date).toBe(today);
  });
});
