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
            <tr class="text-center com-font-s13-w700">
              <th
                scope="col"
                v-text="$t('labels.height')"
              />
              <th
                scope="col"
                v-text="$t('labels.hash')"
              />
              <th
                scope="col"
                v-text="$t('labels.result')"
              />
              <th
                scope="col"
                v-text="$t('labels.date')"
              />
            </tr>
          </thead>
          <tbody>
            <CellTransactionsRow
              v-for="transaction in transactions"
              :key="transaction.txhash"
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
import { arrayManager, localizedRoute } from "Utils";
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
      allTransactions: "transactions"
    }),
    linkToTransactions() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    },
    transactions() {
      let transactions = arrayManager.uniqueByKey(
        this.allTransactions,
        JSON.stringify
      );
      return transactions
        .sort(function(a, b) {
          return b.height - a.height;
        })
        .slice(0, 10);
    }
  },
  methods: {
    ...mapActions("transactions", {
      fetchTransactions: "fetchTransactions"
    }),
    async getTransactions(types) {
      this.isFetching = true;
      const limit = 20;
      try {
        const response = await api.requestLastBlock();
        const totalTxs = parseInt(response.data.block.header.total_txs);
        const page = Math.floor(totalTxs / limit) + 1;
        types.forEach(type => {
          this.fetchTransactions({
            tag: `action=${type}`,
            page,
            limit
          });
          if (page > 1) {
            this.fetchTransactions({
              tag: `action=${type}`,
              page: page - 1,
              limit
            });
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    if (this.allTransactions.length === 0)
      this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>