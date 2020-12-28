class TransactionsTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.txs = null;
    this.coin = null;
    this.multiTypes = null;
    this.filter = null;
  }

  setTxs(txs) {
    this.txs = txs;
    return this;
  }

  setCoin(coin) {
    this.coin = coin;
    return this;
  }

  setMultiTypes(multiTypes) {
    this.multiTypes = multiTypes;
    return this;
  }

  setFilter(filter) {
    this.filter = filter;
    return this;
  }

  get() {
    let transactionsTable = [];
    let transactions = [];

    if (this.filter === null || this.filter === "") {
      transactions = this.txs.map(obj => ({
        ...obj
      }));
    } else {
      transactions = this.txs.reduce((result, transaction) => {
        if (transaction.logs && transaction.logs.length > 0) {
          transaction.logs.forEach(log => {
            if (log.events && log.events.length > 0) {
              log.events.forEach(event => {
                if (
                  event.type &&
                  event.type === "message" &&
                  event.attributes &&
                  event.attributes.length > 0
                ) {
                  event.attributes.forEach(attribute => {
                    if (attribute.value === this.filter) {
                      result.push(transaction);
                    }
                  });
                }
              });
            }
          });
        }

        return result;
      }, []);
    }

    transactions.forEach(tx => {
      const txValue = tx.tx.value;
      const height = tx.height;
      const type = txValue.msg.length > 1 ?
        this.multiTypes :
        txValue.msg.find(
          msg => typeof msg.type !== undefined
        ).type.split("/").pop();
      const result = tx.code ? false : true;
      let amounts = [];
      txValue.msg.forEach(msg => {
        let amount = msg.value.amount;
        if (Array.isArray(amount)) {
          amounts.push.apply(amounts, amount);
        } else if (amount instanceof Object) {
          amounts.push(amount);
        }
      });
      const amount = amounts.length > 0 ?
        amounts.reduce((acc, item) => acc + parseFloat(item.amount), 0) :
        0;
      const fee = txValue.fee.amount.reduce((acc, item) => acc + parseFloat(item.amount), 0);
      const hash = tx.txhash;
      const date = new Date(tx.timestamp).toLocaleString();

      const data = {
        height: height,
        type: type,
        result: result,
        amount: toCoin(amount, 6, 6, this.coin),
        fee: toCoin(fee, 6, 6, this.coin),
        hash: hash,
        date: date,
      };
      transactionsTable.push(data);
    });

    this.clear();
    return transactionsTable;
  }
}

const toCoin = (x, maximumFractionDigits, minimumFractionDigits, coin) => {
  const amount = x / 1000000;
  return amount === 0 ? 0 : new Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    minimumFractionDigits
  }).format(amount) + " " + coin;
};

export default new TransactionsTableAdapter();