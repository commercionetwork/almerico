const storageHandler = {
  get(key) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    return data;
  },
  set({ payload, key }) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const index = data.findIndex((v) => v === payload);
    if (index > -1) return;
    data.push(payload);
    localStorage.setItem(key, JSON.stringify(data));
  },
  remove({ payload, key }) {
    const data = JSON.parse(localStorage.getItem(key));
    const index = data.findIndex((v) => v === payload);
    if (index < 0) return;
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
  },
};

export default storageHandler;
