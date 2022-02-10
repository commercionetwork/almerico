import { APIS, VALIDATORS } from '@/constants';
import store from '@/store';

export default {
  onError(event) {
    _handleErrorEvent(event);
  },
  onMessage(data) {
    const eventData = JSON.parse(data);
    const type =
      eventData.result.data != undefined
        ? eventData.result.data.type.replace('tendermint/event/', '')
        : null;
    _handleEvent(type, eventData);
  },
};

const _handleErrorEvent = (event) => store.dispatch('handleError', event.error);

const _handleEvent = (type, eventData) => {
  switch (type) {
    case APIS.WS.EVENTS.NEW_BLOCK:
      _handleNewBlockEvent(eventData);
      break;
    case APIS.WS.EVENTS.VALIDATOR_SET_UPDATES:
      _handleNewValidatorSetsEvent(eventData);
      break;
    case APIS.WS.EVENTS.TX:
      _handleNewTxEvent(eventData);
      break;
    default:
      break;
  }
};

const _handleNewBlockEvent = (data) => {
  store.commit('application/setLatestTransactions', []);
  const block = data.result.data.value.block;
  store.commit('application/setLatestBlock', block);
  store.commit('blocks/setNewHeight', block.header.height);
  if (block.data.txs.length > 0)
    store.dispatch('application/fetchLatestTransactions', block.header.height);
  if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY)
    store.commit('validators/setNewHeight', block.header.height);
};

const _handleNewValidatorSetsEvent = (data) => {
  store.commit(
    'application/setLatestValidatorSets',
    data.result.data.value.validator_updates
  );
  store.dispatch('application/refreshValidators');
};

const _handleNewTxEvent = (data) => {
  const height = data.result.data.value.TxResult.height;
  store.commit('home/setTxEventHeight', height);
  store.commit('transactions/setTxEventHeight', height);
};
