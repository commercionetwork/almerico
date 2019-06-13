<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex align-items-center">
        <div class="col-12 d-flex justify-content-start">
          <h2
            class="com-font-s16-w700"
            v-html="'Power events'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th scope="col">Height</th>
                  <th scope="col">TxHash</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center com-font-s13-w400"
                  v-for="transaction in transactions.slice().reverse()"
                  :key="transaction.id"
                >
                  <td class="align-middle">
                    <router-link
                      :to="toBlockDetails(transaction.height)"
                      v-text="transaction.height"
                    />
                  </td>
                  <td class="align-middle">
                    <router-link
                      :to="toTransactionDetails(transaction.hash)"
                      v-text="transaction.hash"
                      class="d-inline-block text-truncate com-font-s13-w400"
                      style="max-width: 120px;"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="`${transaction.amount} ATOM`"
                  />
                  <td
                    class="align-middle"
                    v-text="transaction.time.toLocaleString()"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockTransactions } from "Store/transactions/__mocks__/transactionsOld";

export default {
  name: "ValidatorDetailsEvents",
  description: "Display an events list",
  computed: {
    isFetching() {
      return false;
    },
    transactions() {
      return mockTransactions(5);
    }
  },
  methods: {
    toBlockDetails(id) {
      return {
        name: ROUTE_NAMES.BLOCKS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    },
    toTransactionDetails(id) {
      return {
        name: ROUTE_NAMES.TRANSACTIONS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
