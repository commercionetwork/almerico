import { APIS } from '@/constants';
import store from '@/store';

const wsBackendHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(event) {
    const eventData = JSON.parse(event.data);
    if (eventData.event === APIS.WS.EVENTS.BACKEND_VALIDATORS_UPDATES) {
      store.commit('validators/setList', eventData.data.validators);
      store.commit('validators/newUpdate', true);
    }
  },
};

export default wsBackendHandler;
