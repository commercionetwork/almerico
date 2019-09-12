<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          class="py-3 com-font-s16-w700"
          v-text="$t('titles.transactions')"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="orderedTransactions.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
          data-test="pagination"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div
          v-if="isFetching"
          class="alert alert-warning"
          role="alert"
          v-text="$t('messages.loading')"
          data-test="loading"
        />
        <div
          v-else-if="!isFetching && hasError"
          class="alert alert-danger"
          role="alert"
          v-text="$t('messages.fetchingError')"
          data-test="has-error"
        />
        <AccountTransactionsTable
          v-else-if="!isFetching && !hasError && orderedTransactions.length > 0"
          :transactions="transactionsPage"
          data-test="items"
        />
        <div
          v-else
          class="alert alert-info"
          role="alert"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AccountTransactionsTable from "./AccountTransactionsTable.vue";
import Pagination from "Components/common/Pagination.vue";

import { mapGetters } from "vuex";

export default {
  name: "AccountTransactions",
  description: "Display the account transactions list",
  components: {
    AccountTransactionsTable,
    Pagination
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address"
    }
  },
  data() {
    return {
      limit: 5,
      page: 1
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
    transactionsPage() {
      return this.orderedTransactions.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    orderedTransactions() {
      let transactions = [...this.transactions];
      const txs =  transactions.filter(transaction => {
        return transaction.events.find(event =>
          event.attributes.find(attribute => attribute.value === this.address)
        );
      });
      return txs.sort(function(a, b) {
        return b.height - a.height;
      });
    },
    total() {
      return this.orderedTransactions.length;
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
