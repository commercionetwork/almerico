import { APIS } from '@/constants';
import store from '@/store';

const wsBackendHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(event) {
    const eventData = JSON.parse(event.data);
    if (
      eventData.event &&
      eventData.event === APIS.WS.EVENTS.BACKEND_NEW_HEIGHT
    ) {
      store.commit('validators/setNewBlock', true);
      store.dispatch('validators/fetchList');
      // if (eventData.data.hasTxs) {
      // }
    }
  },
};

export default wsBackendHandler;
