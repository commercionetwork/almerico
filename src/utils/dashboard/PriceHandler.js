import { dateHandler } from '@/utils';

export default class PriceHandler {
  constructor(txs) {
    this.txs = txs;
  }

  getMutations() {
    const mutations = [];
    for (const tx of this.txs) {
      const priceMutation = new PriceMutation(tx);
      mutations.push(priceMutation.get());
    }
    return mutations;
  }
}

class PriceMutation {
  constructor(tx) {
    this.tx = tx;
  }

  get() {
    return {
      price: this.getPrice(),
      date: this.getDate(),
    };
  }

  getPrice() {
    const type = 'commercio/MsgSetCCCConversionRate';
    const msgs = this.tx.tx.value.msg;
    const index = msgs.findIndex((msg) => msg.type === type);
    return 1 / parseFloat(msgs[index].value.rate);
  }

  getDate() {
    return dateHandler.getFormattedDate(this.tx.timestamp);
  }
}
