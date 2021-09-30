import { RANGE } from '@/constants';
import { dateHandler } from '@/utils';
import { shuffle } from 'lodash';
import { mockRateUpdates } from '../../../../store/dashboard/__mocks__/listings';
import priceChartHelper from '../priceChartHelper';

describe('views/dashboard/helpers/priceChartHelper', () => {
  const startingDate = dateHandler.getUtcDate('2020/2/1');

  test('if "getAllSortedListings" method add first rate, order items by date and return objects with "rate" and "date" keys', () => {
    const rateUpdates = shuffle(
      mockRateUpdates({
        updates: 5,
        year: 2021,
        month: 2,
        day: 1,
      }),
    );
    const all = priceChartHelper.getAllSortedListings({
      startingDate,
      rateUpdates,
    });

    expect(all[0].price).toBe(1);
    expect(all[0].date).toBe(startingDate);
    all.forEach((el, i) => {
      expect(new Date(el.date).getMilliseconds()).toBeLessThanOrEqual(
        new Date(all[i++].date).getMilliseconds(),
      );
    });
    all.forEach((el) => {
      expect(Object.keys(el)).toStrictEqual(['price', 'date']);
    });
  });

  test('if "getListingsByRange" method return 2 listings when there are not updates', () => {
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
});
