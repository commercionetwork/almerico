class TransactionsFilter {
  constructor() {
    this.clear();
  }

  clear() {
    this.txs = null;
    this.filter = null;
  }

  setTxs(txs) {
    this.txs = txs;
    return this;
  }

  setFilter(filter) {
    this.filter = filter;
    return this;
  }

  get() {
    const transactions = filterTransactions({
      transactions: this.txs,
      filter: this.filter,
    });

    this.clear;
    return transactions;
  }
}

const filterTransactions = ({ transactions, filter }) => {
  if (filter === null || filter === '') {
    return transactions.map((obj) => ({
      ...obj,
    }));
  }
  let filteredTransactions = [];
  for (const transaction of transactions) {
    if (parseTransaction({ transaction: transaction, filter: filter })) {
      filteredTransactions.push(transaction);
    }
  }
  return filteredTransactions;
};

const parseTransaction = ({ transaction, filter }) => {
  const logs = transaction.logs ? transaction.logs : [];
  if (logs.length === 0) {
    return null;
  }
  for (const log of logs) {
    if (
      parseLog({ transaction: transaction, filter: filter, log: log }) !== null
    ) {
      return transaction;
    }
  }
  return null;
};

const parseLog = ({ transaction, filter, log }) => {
  const events = log.events ? log.events : [];
  if (events.length === 0) {
    return null;
  }
  for (const event of events) {
    if (
      parseEvent({ transaction: transaction, filter: filter, event: event }) !==
      null
    ) {
      return transaction;
    }
  }
  return null;
};

const parseEvent = ({ transaction, filter, event }) => {
  const attributes = event.attributes ? event.attributes : [];
  const type = event.type ? event.type : null;
  if (attributes.length === 0 || type === null || type !== 'message') {
    return null;
  }
  for (const attribute of attributes) {
    if (attribute.value === filter) {
      return transaction;
    }
  }
  return null;
};

export default new TransactionsFilter();
