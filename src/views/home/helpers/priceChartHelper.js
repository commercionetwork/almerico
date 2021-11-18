import { HOME } from '@/constants';
import { dateHandler } from '@/utils';
import { orderBy } from 'lodash';

const BACKGROUND_COLOR = 'rgba(179, 224, 255, 0.5)';
const BORDER_COLOR = 'rgba(77, 184, 255, 1)';
const POINT_BACKGROUND_COLOR = 'rgba(0, 138, 230, 1)';
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.2,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const index = tooltipItem.dataIndex;
          return `${tooltipItem.dataset.data[index]}`;
        },
      },
    },
  },
};

const priceChartHelper = {
  /**
   *
   * @typedef {Object} GetChartDataParams
   * @property {String} startingDate
   * @property {Array.<Object>} rateUpdates
   * @property {String} range
   *
   * @param {GetChartDataParams} params
   * @returns {Object}
   */
  getChartData({ startingDate, rateUpdates, range }) {
    const all = this.getAllSortedListings({
      startingDate,
      rateUpdates,
    });
    const listings = this.getListingsByRange({
      listings: all,
      range,
    });
    return {
      labels: listings.map((update) =>
        dateHandler.getFormattedDate(update.date),
      ),
      datasets: [
        {
          data: listings.map((update) => update.price.toFixed(2)),
          fill: true,
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
          pointBackgroundColor: POINT_BACKGROUND_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
  /**
   *
   * @typedef {Object} GetAllSortedListingsParams
   * @property {String} startingDate
   * @property {Array.<Object>} rateUpdates
   *
   * @param {GetAllSortedListingsParams} params
   * @returns {Array.<Object>}
   */
  getAllSortedListings({ startingDate, rateUpdates }) {
    let all = [];
    all.push(
      new Conversion({
        rate: 1,
        date: startingDate,
      }),
    );
    if (rateUpdates.length > 0) {
      for (const update of rateUpdates) {
        all.push(
          new Conversion({ rate: _getRate(update), date: update.timestamp }),
        );
      }
    }
    const listings = all.map(
      (it) => new Listing({ price: 1 / it.rate, date: it.date }),
    );
    return orderBy(listings, [`date`], ['asc']);
  },
  /**
   *
   * @typedef {Object} GetPriceByRangeParams
   * @property {Array.<Object>} prices
   * @property {String} range
   *
   * @param {GetPriceByRangeParams} params
   * @returns {Array.<Object>}
   */
  getListingsByRange({ listings, range }) {
    const lastListing = _getLastListing(listings);
    const startingTimestamp = _getStartingTimestamp(range);
    if (listings.length === 1) {
      return _buildFromOneListing(lastListing, startingTimestamp);
    }
    if (listings.length === 2) {
      return _buildFromTwoListings(listings, lastListing, startingTimestamp);
    }
    return _buildByRange(listings, lastListing, startingTimestamp);
  },
};

export default priceChartHelper;

const _getLastListing = (listings) => {
  const lastPrice = listings[listings.length - 1];
  return new Listing({
    price: lastPrice.price,
    date: dateHandler.getUtcDate(),
  });
};

const _getStartingTimestamp = (range) => {
  switch (range) {
    case HOME.RANGE.TODAY:
      return dateHandler.getSubtractedDate(1, 'day');
    case HOME.RANGE.WEEK:
      return dateHandler.getSubtractedDate(7, 'day');
    case HOME.RANGE.MONTH:
      return dateHandler.getSubtractedDate(1, 'month');
    default:
      return dateHandler.getSubtractedDate(1, 'month');
  }
};

const _buildFromOneListing = (lastListing, startingTimestamp) => {
  const firstListing = new Listing({
    price: lastListing.price,
    date: startingTimestamp,
  });
  return [firstListing, lastListing];
};

const _buildFromTwoListings = (listings, lastListing, startingTimestamp) => {
  const firstListing = new Listing({
    price: listings[0].price,
    date: startingTimestamp,
  });
  return [firstListing, lastListing];
};

const _buildByRange = (listings, lastListing, startingTimestamp) => {
  const filteredListings = listings.filter(
    (listing) => listing.date > startingTimestamp,
  );
  if (!filteredListings.length) {
    return _buildFromOneListing(lastListing, startingTimestamp);
  }
  const firstListing = new Listing({ date: startingTimestamp });
  const firstDiscardedListingIndex =
    listings.findIndex((listing) => listing.date > startingTimestamp) - 1;
  firstListing.price =
    firstDiscardedListingIndex < 0
      ? listings[0]['price']
      : listings[firstDiscardedListingIndex]['price'];
  if (filteredListings.length === 1) {
    return [firstListing, lastListing];
  }
  const lastDuplicatedListing = _getLastDuplicatedListing(
    filteredListings[filteredListings.length - 1]['date'],
    lastListing['date'],
    'day',
  );
  return lastDuplicatedListing
    ? [firstListing, ...filteredListings]
    : [firstListing, ...filteredListings, lastListing];
};

const _getLastDuplicatedListing = (lastFilteredTms, lastListingTms, unit) => {
  return dateHandler.checkIsSame(lastFilteredTms, lastListingTms, unit);
};

const _getRate = (update) => {
  const type =
    '/commercionetwork.commercionetwork.commerciomint.MsgSetCCCConversionRate';
  const msgs = update.tx.body.messages;
  const index = msgs.findIndex((msg) => msg['@type'] === type);
  return parseFloat(msgs[index].rate);
};

class Conversion {
  constructor({ rate, date }) {
    this.rate = rate;
    this.date = date;
  }
}

class Listing {
  constructor({ price, date }) {
    this.price = price;
    this.date = date;
  }
}
