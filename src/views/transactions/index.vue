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
    <SectionHeader />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th
                    scope="col"
                    v-text="$t('labels.hash')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.type')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.result')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.amount')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.fee')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.height')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.date')"
                  />
                </tr>
              </thead>
              <tbody v-if="isFetching">
                <span
                  class="com-font-s14-w400"
                  v-text="$t('messages.loading')"
                  data-test="loading"
                />
              </tbody>
              <tbody v-else-if="!isFetching && hasError">
                <span
                  class="text-danger com-font-s14-w400"
                  v-text="message"
                  data-test="has-error"
                />
              </tbody>
              <tbody v-else-if="!isFetching && !hasError && transactions.length > 0">
                <TableTransactionsRow
                  v-for="(transaction, index) in transactionsList"
                  :key="index"
                  :transaction="transaction"
                  data-test="items"
                />
              </tbody>
              <tbody v-else>
                <span
                  class="text-center text-info com-font-s14-w700"
                  v-text="$t('messages.noItems')"
                  data-test="no-items"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchBar from "Components/common/SearchBar.vue";
import TableTransactionsRow from "./TableTransactionsRow.vue";

import api from "Store/blocks/api";
import { TX_TYPES } from "Constants";
import { arrayManager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    SectionHeader,
    SearchBar,
    TableTransactionsRow
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
    async getTransactions(types) {
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
    this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>
