<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.transactions')" />
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div
        v-else
        class="table-responsive"
      >
        <table class="table">
          <thead>
            <tr class="text-center com-font-s13-w700">
              <th scope="col">TxHash</th>
              <th scope="col">Type</th>
              <th scope="col">Result</th>
              <th scope="col">Amount</th>
              <th scope="col">Fee</th>
              <th scope="col">Height</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <TableTransactionsRow
              v-for="transaction in transactions"
              :key="transaction.txhash"
              :transaction="transaction"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableTransactionsRow from "./TableTransactionsRow.vue";

import api from "Store/tendermint/api";
import { TX_TYPES } from "Constants";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    SectionHeader,
    TableTransactionsRow
  },
  data() {
    return {
      isFetching: false
    };
  },
  computed: {
    ...mapGetters("tendermint", {
      allTransactions: "transactions"
    }),
    transactions() {
      let transactions = this.uniqBy(this.allTransactions, JSON.stringify);
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
    }
  },
  methods: {
    ...mapActions("tendermint", {
      fetchTransactions: "fetchTransactions"
    }),
    uniqBy(a, key) {
      return [...new Map(a.map(x => [key(x), x])).values()];
    },
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
