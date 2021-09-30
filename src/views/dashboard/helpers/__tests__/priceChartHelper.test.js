import { mockRateUpdates } from '../../../../store/dashboard/__mocks__/listings';
import { dateHandler } from '@/utils';
import priceChartHelper from '../priceChartHelper';
import { shuffle } from 'lodash';

describe('views/dashboard/helpers/priceChartHelper', () => {
  test('if "getAllSortedListings" method add first rate, order items by date and return objects with "rate" and "date" keys', () => {
    const startingDate = dateHandler.getUtcDate('2020/2/1');
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
});
