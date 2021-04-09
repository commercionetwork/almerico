import { dateHandler } from '@/utils';

export default class PriceHandler {
  constructor(firstRate, rateUpdates) {
    this.firstRate = firstRate;
    this.rateUpdates = rateUpdates;
  }

  getMutations() {
    const mutations = [];
    for (const update of this.rateUpdates) {
      const priceMutation = new PriceMutation(update);
      mutations.push(priceMutation.get());
    }
    if (mutations.length < 5) {
      const firstListing = new Listing(
        1 / parseFloat(this.firstRate.rate),
        dateHandler.getFormattedDate(this.firstRate.date),
      );
      mutations.unshift(firstListing);
    }
    return mutations.length > 5
      ? mutations.slice(mutations.length - 5)
      : mutations;
  }
}

class PriceMutation {
  constructor(update) {
    this.update = update;
  }

  get() {
    return new Listing(this.getPrice(), this.getDate());
  }

  getPrice() {
    const type = 'commercio/MsgSetCCCConversionRate';
    const msgs = this.update.tx.value.msg;
    const index = msgs.findIndex((msg) => msg.type === type);
    return 1 / parseFloat(msgs[index].value.rate);
  }

  getDate() {
    return dateHandler.getFormattedDate(this.update.timestamp);
  }
}

class Listing {
  constructor(price, date) {
    this.price = price;
    this.date = date;
  }
}
