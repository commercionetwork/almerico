/**
 * Tendermint actions
 */
import {
  RpcClient
} from "tendermint";
import {
  WS
} from "Constants";

const client = RpcClient(WS);

export default {
  /**
   * Action to subscribe new block web socket
   * 
   * @param {Function} commit
   */
  subNewClient({
    commit,
    dispatch
  }) {
    client.subscribe({
      query: "tm.event = 'NewBlock'"
    }, event => {
      let block = event.block;
      commit("blocks/addNewBlock", block, {
        root: true
      });
      commit("blocks/setLastBlock", block, {
        root: true
      });
      dispatch("stake/fetchPool", null, {
        root: true
      });
      if (parseInt(block.header.num_txs) > 0) {
        dispatch("transactions/updateTransactions", block.header.height, {
          root: true
        });
      }
    });
  },
};
