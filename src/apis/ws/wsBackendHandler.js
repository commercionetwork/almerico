import store from '@/store';

const wsBackendHandler = {
  onError(event) {
    store.commit('application/setError', event.error);
  },
  onMessage(event) {
    const eventData = JSON.parse(event.data);
    console.log(eventData);
  },
};

export default wsBackendHandler;
