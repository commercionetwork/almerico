import { APIS } from '@/constants';
import store from '@/store';

const wsBackendHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(event) {
    const eventData = JSON.parse(event.data);
    if (
      eventData.events &&
      eventData.events.indexOf(APIS.WS.EVENTS.BACKEND_NEW_BLOCK) > -1
    ) {
      store.commit('validators/setList', eventData.data.validators);
      store.commit('validators/setNewBlock', true);
      if (eventData.events.indexOf(APIS.WS.EVENTS.BACKEND_NEW_TX) > -1) {
        store.commit('validators/setNewUpdate', true);
      }
    }
  },
};

export default wsBackendHandler;
