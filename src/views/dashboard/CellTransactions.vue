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

import { ROUTE_NAMES } from "Constants";
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
      limit: 10
    };
  },
  computed: {
    ...mapGetters("transactions", {
      isFetching: "isFetching",
      message: "message",
      transactions: "transactions"
    }),
    hasError() {
      return this.message ? true : false;
    },
    linkToTransactions() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    },
    transactionsList() {
      const transactions = [...this.transactions];
      transactions.sort(function(a, b) {
        return b.height - a.height;
      });
      return transactions.slice(0, 10);
    }
  },
  methods: {
    ...mapActions("transactions", {
      fetchTransactions: "fetchTransactions"
    }),
    getTransactions() {
      let types = this.$config.transactions.supported_types.map(
        type => type.tag
      );
      types.forEach(async type => {
        const tag = `message.action=${type}`;
        this.fetchTransactions(tag, this.limit);
      });
    }
  },
  created() {
    if (this.transactions.length === 0) this.getTransactions();
  }
};
</script>