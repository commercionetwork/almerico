<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.transactions')" />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12">
          <div
            v-if="isFetching"
            v-text="$t('messages.loading')"
          />
          <div
            v-else-if="!isFetching && hasError"
            v-text="message"
          />
          <div
            v-else-if="!isFetching && !hasError && transactions.length > 0"
            class="table-responsive"
          >
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
              <tbody>
                <TableTransactionsRow
                  v-for="transaction in transactions"
                  :key="transaction.txhash"
                  :transaction="transaction"
                />
              </tbody>
            </table>
          </div>
          <div
            v-else
            class="text-center com-font-s13-w700"
            v-text="$t('messages.noItems')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
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
      allTransactions: "transactions",
      message: "message"
    }),
    transactions() {
      let transactions = arrayManager.uniqueByKey(
        this.allTransactions,
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
    if (this.allTransactions.length === 0)
      this.getTransactions(Object.values(TX_TYPES));
  }
};
</script>
