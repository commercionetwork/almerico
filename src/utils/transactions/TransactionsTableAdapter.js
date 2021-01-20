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
    let transactions = filterTransactions(this.txs, this.filter);

    transactions.forEach((tx) => {
      const txValue = tx.tx.value;
      const type =
        txValue.msg.length > 1
          ? this.multiTypes
          : txValue.msg
              .find((msg) => typeof msg.type !== undefined)
              .type.split('/')
              .pop();
      let amounts = [];
      txValue.msg.forEach((msg) => {
        let amount = msg.value.amount;
        if (Array.isArray(amount)) {
          amounts.push.apply(amounts, amount);
        } else if (amount instanceof Object) {
          amounts.push(amount);
        }
      });
      const amount =
        amounts.length > 0
          ? amounts.reduce((acc, item) => acc + parseFloat(item.amount), 0)
          : 0;

      const data = {
        height: tx.height,
        type: type,
        result: tx.code ? false : true,
        amount: toCoin(amount, 6, 6, this.coin),
        fee: formatFee(tx.tx.value, this.coin),
        hash: tx.txhash,
        date: new Date(tx.timestamp).toLocaleString(),
      };
      transactionsTable.push(data);
    });

    this.clear();
    return transactionsTable;
  }
}

const formatFee = (value, coin) => {
  const fee = value.fee.amount.reduce(
    (acc, item) => acc + parseInt(item.amount),
    0
  );
  return toCoin(fee, 6, 6, coin);
};

const filterTransactions = (transactions, filter) => {
  if (filter === null || filter === '') {
    return transactions.map((obj) => ({
      ...obj,
    }));
  }
  return transactions.reduce((acc, transaction) => {
    parseTransaction(acc, transaction, filter);
    return acc;
  }, []);
};

const parseTransaction = (acc, transaction, filter) => {
  if (!transaction.logs || transaction.logs.length === 0) {
    return;
  }
  transaction.logs.forEach((log) => {
    parseLog(acc, transaction, filter, log);
  });
};

const parseLog = (acc, transaction, filter, log) => {
  if (!log.events || log.events.length === 0) {
    return;
  }
  log.events.forEach((event) => {
    parseEvent(acc, transaction, filter, event);
  });
};

const parseEvent = (acc, transaction, filter, event) => {
  if (
    !event.type ||
    event.type !== 'message' ||
    !event.attributes ||
    event.attributes.length === 0
  ) {
    return;
  }
  event.attributes.forEach((attribute) => {
    if (attribute.value === filter) {
      acc.push(transaction);
    }
  });
};

const toCoin = (x, maximumFractionDigits, minimumFractionDigits, coin) => {
  const amount = x / 1000000;
  return amount === 0
    ? 0
    : new Intl.NumberFormat(undefined, {
        maximumFractionDigits,
        minimumFractionDigits,
      }).format(amount) +
        ' ' +
        coin;
};

export default new TransactionsTableAdapter();
