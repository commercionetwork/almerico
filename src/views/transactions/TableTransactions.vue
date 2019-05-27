<template>
  <div class="p-1 h-100 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">TxHash</th>
              <th scope="col">Type</th>
              <th scope="col">Result</th>
              <th scope="col">Fee</th>
              <th scope="col">Height</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center com-font-s12-w400"
              v-for="transaction in transactions.slice().reverse()"
              :key="transaction.id"
            >
              <td class="align-middle">
                <router-link
                  :to="toTransactionDetails(transaction.hash)"
                  v-text="transaction.hash"
                  class="d-inline-block text-truncate com-font-s10-w400"
                  style="max-width: 120px;"
                />
              </td>
              <td
                class="align-middle"
                v-text="transaction.type"
              />
              <td
                class="align-middle"
                v-text="transaction.result"
              />
              <td class="align-middle">{{ transaction.fee }} ATOM</td>
              <td
                class="align-middle"
                v-text="transaction.height"
              />
              <td
                class="align-middle"
                v-text="getSeconds(transaction.time)"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "TableTransactions",
  description: "Display the tansactions list",
  props: {
    transactions: {
      type: Array,
      required: true,
      note: "The transactions list to dipslay"
    }
  },
  computed: {
    isFetching() {
      return false;
    }
  },
  methods: {
    getSeconds(time) {
      let seconds = ((new Date() - time) / 1000).toFixed(0);
      return `${seconds}s ago`;
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
