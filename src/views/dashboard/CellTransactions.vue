<template>
  <TableCell
    :hasError="hasError"
    :hasItems="transactions.length > 0"
    :isFetching="isFetching"
    :link="linkToTransactions"
    :title="$t('titles.transactions')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th scope="col">
                <span v-text="$t('labels.height')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.hash')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.result')" />
              </th>
              <th scope="col">
                <span v-text="$t('labels.date')" />
              </th>
            </tr>
          </thead>
          <tbody>
            <CellTransactionsRow
              v-for="(transaction, index) in transactionsList"
              :key="index"
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
import { ROUTE_NAMES } from "Constants";
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
      hasError: false,
      isFetching: false
    };
  },
  computed: {
    ...mapGetters("transactions", {
      transactions: "transactions"
    }),
    linkToTransactions() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    },
    transactionsList() {
      let transactions = arrayManager.uniqueByKey(
        this.transactions,
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
    async getTransactions() {
      let types = this.$config.transactions.supported_types.map(
        type => type.tag
      );
      this.isFetching = true;
      const limit = 20;
      try {
        const response = await api.requestLastBlock();
        const totalTxs = parseInt(response.data.block.header.total_txs);
        const page = Math.floor(totalTxs / limit) + 1;
        types.forEach(type => {
          this.fetchTransactions({
            tag: `message.action=${type}`,
            page,
            limit
          });
          if (page > 1) {
            this.fetchTransactions({
              tag: `message.action=${type}`,
              page: page - 1,
              limit
            });
          }
        });
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getTransactions();
  }
};
</script>