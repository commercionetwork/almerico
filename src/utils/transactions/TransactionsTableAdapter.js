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
      const type = getType(tx.tx.value, this.multiTypes);
      const amounts = getAmounts(tx.tx.value);

      transactionsTable.push({
        height: tx.height,
        type: type,
        result: tx.code ? 0 : 1,
        amount: formatAmount(amounts, this.coin),
        fee: formatFee(tx.tx.value),
        hash: tx.txhash,
        date: new Date(tx.timestamp).toLocaleString(),
      });
    });

    this.clear();
    return transactionsTable;
  }
}

const getType = (txValue, multiTypes) =>
  txValue.msg.length > 1
    ? multiTypes
    : txValue.msg
        .find((msg) => typeof msg.type !== undefined)
        .type.split('/')
        .pop();

const formatAmount = (amounts, coin) => {
  const amount =
    amounts.length > 0
      ? amounts.reduce((acc, item) => acc + parseFloat(item.amount), 0)
      : 0;
  return toCoin(amount, 6, 6, coin);
};

const getAmounts = (txValue) => {
  let amounts = [];
  txValue.msg.forEach((msg) => {
    let amount = msg.value.amount;
    if (Array.isArray(amount)) {
      amounts.push.apply(amounts, amount);
    } else if (amount instanceof Object) {
      amounts.push(amount);
    }
  });
  return amounts;
};

const formatFee = (value) => {
  const amount = value.fee && value.fee.amount ? value.fee.amount : null;
  if (amount === null) {
    return '-';
  }
  return amount.length >= 1 ? concatAmounts(amount) : '-';
};

const concatAmounts = (amounts) => {
  let result = '';
  for (let i = 0; i < amounts.length; i++) {
    if (i > 0) {
      result += '\n';
    }
    result += `${formatAmountToDecimal(amounts[i]['amount'], 0, 0)} ${
      amounts[i]['denom']
    }`;
  }
  return result;
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

const formatAmountToDecimal = (
  amount,
  maximumFractionDigits,
  minimumFractionDigits
) => {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};

export default new TransactionsTableAdapter();
