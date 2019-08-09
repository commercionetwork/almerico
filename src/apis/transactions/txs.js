import api from "./api";

const txsManager = {
  async fetchTransactions(tag, limit) {
    let txs = [];
    let err = null;
    try {
      const response = await api.requestTransactions({
        tag,
        page: 1,
        limit
      });
      const totalPage = parseInt(response.data.page_total);
      if (totalPage > 0) {
        txs.push(...response.data.txs);
        if (totalPage > 1) {
          let page = 2;
          while (page <= totalPage) {
            const res = await api.requestTransactions({
              tag,
              page,
              limit
            });
            txs.push(...res.data.txs);
            page++;
          }
        }
      }
    } catch (error) {
      err = error;
    }
    return {
      txs: txs,
      err: err
    };
  },
  async fetchTransaction(hash) {
    let tx = null;
    let err = null;
    try {
      const response = await api.requestTransactionByHash(hash);
      tx = response.data;
    } catch (error) {
      err = error;
    }
    return {
      tx: tx,
      err: err
    };
  }
};

export default txsManager;
