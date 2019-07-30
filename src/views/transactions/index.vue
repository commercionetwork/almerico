<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.transactions')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div class="row my-1">
      <div class="col-12">
        <SectionHeader />
      </div>
    </div>
    <div class="row rounded com-bg-body">
      <div class="col-12">
        <div class="row py-3 px-5">
          <div class="col-12">
            <div
              v-if="isFetching"
              class="text-info com-font-s14-w400"
              v-text="$t('messages.loading')"
              data-test="loading"
            />
            <div
              v-else-if="!isFetching && hasError"
              class="text-danger com-font-s14-w400"
              v-text="message"
              data-test="has-error"
            />
            <TableTransactions
              v-else-if="!isFetching && !hasError && transactions.length > 0"
              :transactions="transactionsList"
              data-test="items"
            />
            <div
              v-else
              class="py-1 text-center text-info border-top com-font-s14-w700"
              v-text="$t('messages.noItems')"
              data-test="no-items"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchBar from "Components/common/SearchBar.vue";
import TableTransactions from "./TableTransactions.vue";

import api from "Store/blocks/api";
import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    SectionHeader,
    SearchBar,
    TableTransactions
  },
  data() {
    return {
      hasError: false,
      isFetching: false
    };
  },
  computed: {
    ...mapGetters("transactions", {
      transactions: "transactions",
      message: "message"
    }),
    transactionsList() {
      let transactions = arrayManager.uniqueByKey(
        this.transactions,
        JSON.stringify
      );
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
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
        const page = Math.ceil(totalTxs / limit);
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
