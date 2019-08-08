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

import api from "Store/transactions/api";
import { ROUTE_NAMES } from "Constants";
import { arrayManager, localizedRoute } from "Utils";

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
      isFetching: false,
      transactions: []
    };
  },
  computed: {
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
    async fetchTransactions(type, page, limit) {
      try {
        const response = await api.requestTransactions({
          tag: `message.action=${type}`,
          page,
          limit
        });
        return response;
      } catch (error) {
        this.hasError = true;
      }
    },
    getTransactions() {
      let types = this.$config.transactions.supported_types.map(
        type => type.tag
      );
      this.isFetching = true;
      try {
        types.forEach(async type => {
          const response = await this.fetchTransactions(type, 1, 10);
          const pageTotal = parseInt(response.data.page_total);
          if (pageTotal === 0) {
            return;
          } else if (pageTotal === 1 || pageTotal === 2) {
            this.transactions.push(...response.data.txs);
            if (pageTotal === 2) {
              const response_2 = await this.fetchTransactions(
                type,
                pageTotal,
                10
              );
              this.transactions.push(...response_2.data.txs);
            }
          } else if (pageTotal > 2) {
            let response_3 = await this.fetchTransactions(type, pageTotal, 10);
            this.transactions.push(...response_3.data.txs);
            response_3 = await this.fetchTransactions(type, pageTotal - 1, 10);
            this.transactions.push(...response_3.data.txs);
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