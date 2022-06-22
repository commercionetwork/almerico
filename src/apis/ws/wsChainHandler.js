import { APIS } from '@/constants';
import store from '@/store';

const wsChainHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(data) {
    const eventData = JSON.parse(data);
    const type =
      eventData.result && eventData.result.data
        ? eventData.result.data.type.replace('tendermint/event/', '')
        : null;
    _handleEvent(type, eventData);
  },
};

export default wsChainHandler;

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
  if (
    data['result']['events'] &&
    data['result']['events']['message.action'] &&
    data['result']['events']['message.action'].indexOf(
      APIS.WS.EVENTS.TX_SET_PARAMS
    ) > -1
  ) {
    store.commit('home/setSetParamsEventHeight', height);
  }
};
