import { HOME, SETTINGS } from '@/constants';
import { dateHandler } from '@/utils';

const TX_TYPE =
  '/commercionetwork.commercionetwork.commerciomint.MsgSetCCCConversionRate';

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
  getChartData({ firstDate, rateUpdates, range }) {
    const listings = _getListings({ firstDate, rateUpdates, range });
    return {
      labels: listings.map((listing) => listing.label),
      datasets: [
        {
          data: listings.map((listing) => listing.pricing.price),
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
};

export default priceChartHelper;

const _getListings = ({ firstDate, rateUpdates, range }) => {
  const startDate = _getStartingUTCDate(firstDate, range);
  if (!rateUpdates.length) {
    return _buildListingFromSingleValue(
      SETTINGS.FIRST_CONVERSION_RATE,
      startDate,
    );
  }
  const wantedUpdates = _getWantedUpdates(startDate, rateUpdates);
  if (!wantedUpdates.length) {
    const lastUpdate = rateUpdates[rateUpdates.length - 1];
    return _buildListingFromSingleValue(_getRateFromTx(lastUpdate), startDate);
  }
  const hasAllUpdates = wantedUpdates.length === rateUpdates.length;
  const listings = [];
  if (!hasAllUpdates) {
    const firstDiscardedIndex =
      rateUpdates.findIndex((rate) => rate.timestamp >= startDate) - 1;
    listings.push(_getListingFromUpdate(rateUpdates[firstDiscardedIndex]));
  } else {
    listings.push(new Listing(SETTINGS.FIRST_CONVERSION_RATE, startDate));
  }
  listings.push(..._buildListingsFromValues(wantedUpdates));
  listings[0].date = startDate;
  return listings;
};

const _buildListingFromSingleValue = (rate, startDate) => {
  const startListing = new Listing(rate, startDate);
  const endDate = dateHandler.getUtcDate();
  const endListing = new Listing(rate, endDate);
  return [startListing, endListing];
};

const _buildListingsFromValues = (updates) =>
  updates.map((update) => _getListingFromUpdate(update));

const _getListingFromUpdate = (update) => {
  const rate = _getRateFromTx(update);
  return new Listing(rate, update.timestamp);
};

const _getWantedUpdates = (startDate, rateUpdates) =>
  rateUpdates.filter((rate) => rate.timestamp >= startDate);

const _getRateFromTx = (tx) => {
  const msgs = tx.tx.body.messages;
  const index = msgs.findIndex((msg) => msg['@type'] === TX_TYPE);
  return parseFloat(msgs[index].rate);
};

const _getStartingUTCDate = (firstDate, range) => {
  const rangeDate = _getStartingDateFromRange(range);
  return dateHandler.checkIsBefore(rangeDate, firstDate)
    ? firstDate
    : rangeDate;
};

const _getStartingDateFromRange = (range) => {
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

class Listing {
  constructor(rate, date) {
    this.rate = rate;
    this.date = date;
  }

  get pricing() {
    const price = (1 / this.rate).toFixed(2);
    return { price, date: this.date };
  }

  get label() {
    return dateHandler.getFormattedDate(this.date);
  }
}
