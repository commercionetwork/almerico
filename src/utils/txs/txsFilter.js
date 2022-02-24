const txsFilter = {
  /**
   *
   * @param {Array.<Object>} items
   * @param {String} setting
   * @returns {Array.<Object>}
   */
  filter(items, setting) {
    if (!setting || setting === '') {
      return items.map((obj) => ({
        ...obj,
      }));
    }
    return items.filter((item) => {
      if (_parseTransaction(item, setting)) return item;
    });
  },
};

export default txsFilter;

const _parseTransaction = (tx, filter) => {
  const logs = tx.logs ? tx.logs : [];
  if (logs.length === 0) {
    return null;
  }
  for (const log of logs) {
    if (_parseLog({ tx: tx, filter: filter, log: log }) !== null) {
      return tx;
    }
  }
  return null;
};

const _parseLog = ({ tx, filter, log }) => {
  const events = log.events ? log.events : [];
  if (events.length === 0) {
    return null;
  }
  for (const event of events) {
    if (
      _parseEvent({
        tx: tx,
        filter: filter,
        event: event,
      }) !== null
    ) {
      return tx;
    }
  }
  return null;
};

const _parseEvent = ({ tx, filter, event }) => {
  const attributes = event.attributes ? event.attributes : [];
  const type = event.type ? event.type : null;
  if (attributes.length === 0 || type === null || type !== 'message') {
    return null;
  }
  for (const attribute of attributes) {
    if (attribute.value === filter) {
      return tx;
    }
  }
  return null;
};
