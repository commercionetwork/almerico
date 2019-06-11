<template>
  <TableCell
    :isFetching="isFetching"
    :link="linkToTransactions"
    :title="$t('titles.transactions')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">TxHash</th>
              <th scope="col">Result</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <CellTransactionsRow
              v-for="transaction in transactions"
              :key="transaction.id"
              :transaction="transaction"
            />
          </tbody>
        </table>
      </div>
    </div>
  </TableCell>
</template>

<script>
import CellTransactionsRow from "./CellTransactionsRow.vue";
import TableCell from "Components/common/TableCell.vue";

import api from "Store/blocks/api";
import { ROUTE_NAMES, TX_TYPES } from "Constants";
import { localizedRoute } from "Utils";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "CellTransactions",
  description: "Display the Transactions table",
  components: {
    CellTransactionsRow,
    TableCell
  },
  computed: {
    ...mapGetters("transactions", {
      transactions: "allTransactions",
      isFetching: "isFetching"
    }),
    linkToTransactions() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    }
  },
  methods: {
    ...mapActions("transactions", {
      updateTransactions: "updateTransactions"
    }),
    async getTransactions(types) {
      let totalTxs = 0;
      try {
        const response = await api.requestLastBlock();
        totalTxs = response.data.block.header.total_txs;
      } catch (error) {
        console.log(error);
      }
      let lastPage = Math.round(totalTxs) + 1;
      types.forEach(type => {
        this.updateTransactions({
          tag: `action=${type}`,
          page: lastPage,
          limit: 20
        });
      });
    }
  },
  created() {
    this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>