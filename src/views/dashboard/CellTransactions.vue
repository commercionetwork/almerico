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
  data() {
    return {
      isFetching: false
    };
  },
  computed: {
    ...mapGetters("transactions", {
      allTransactions: "allTransactions"
    }),
    linkToTransactions() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    },
    transactions() {
      let transactions = this.allTransactions.slice();
      return transactions
        .sort(function(a, b) {
          return b.height - a.height;
        })
        .slice(0, 5);
    }
  },
  methods: {
    ...mapActions("transactions", {
      updateTransactions: "updateTransactions"
    }),
    async getTransactions(types) {
      this.isFetching = true;
      const limit = 20;
      let totalTxs = 0;
      try {
        const response = await api.requestLastBlock();
        totalTxs = response.data.block.header.total_txs;
        let lastPage = Math.floor(totalTxs / limit);
        types.forEach(type => {
          this.updateTransactions({
            tag: `action=${type}`,
            page: lastPage,
            limit
          });
          this.updateTransactions({
            tag: `action=${type}`,
            page: lastPage - 1,
            limit
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>