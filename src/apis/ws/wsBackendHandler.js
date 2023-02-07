import { APIS } from '@/constants';
import store from '@/store';

const wsBackendHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(event) {
    const eventData = JSON.parse(event.data);
    if (!eventData) return;
    _handleEvent({ event: eventData.event, data: eventData.data });
  },
};

export default wsBackendHandler;

const _handleEvent = ({ event, data }) => {
  switch (event) {
    case APIS.WS.EVENTS.BACKEND_NEW_HEIGHT:
      _handleEventNewHeight(data);
      break;
    case APIS.WS.EVENTS.BACKEND_EXCHANGE_RATE_OVERVIEW_UPDATE:
      _handleEventExchangeRateOverviewUpdate(data);
      break;
    case APIS.WS.EVENTS.BACKEND_TOKENS_CHART_UPDATE:
      _handleEventTokensChartUpdate(data);
      break;
    default:
      break;
  }
};

const _handleEventNewHeight = (data) => {
  store.commit('application/setEventHeight', data);
  if (data.hasTxs) {
    store.commit('home/setTxEventHeight', data.height);
    store.commit('transactions/setTxEventHeight', data.height);
  }
};

const _handleEventExchangeRateOverviewUpdate = (data) => {
  store.commit('exchangeRate/setEventOverview', data);
};

const _handleEventTokensChartUpdate = (data) => {
  store.commit('exchangeRate/setEventChart', data);
  store.commit('home/setChartEventTokens', data);
};
