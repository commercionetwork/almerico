<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.transactions')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div
        v-else
        class="table-responsive"
      >
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
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

import api from "Store/blocks/api";
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
    ...mapGetters("transactions", {
      allTransactions: "allTransactions"
    }),
    transactions() {
      let transactions = this.allTransactions.slice();
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
    },
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
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
            page: lastPage > 0 ? lastPage : 1,
            limit
          });
          this.updateTransactions({
            tag: `action=${type}`,
            page: lastPage - 1 > 1 ? lastPage - 1 : 1,
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
    if (this.allTransactions.length === 0)
      this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>
