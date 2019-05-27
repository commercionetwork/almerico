<template>
  <TableCell
    :isFetching="isFetching"
    :link="link"
    :title="$t('titles.transactions')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">TxHash</th>
              <th scope="col">Result</th>
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
                  :to="toBlockDetails(transaction.height)"
                  v-text="transaction.height"
                />
              </td>
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
                v-text="transaction.result"
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
  </TableCell>
</template>

<script>
import TableCell from "Components/common/TableCell.vue";

import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

//TODO: remove
import { mockTransactions } from "Store/transactions/__mocks__/transactions";

export default {
  name: "CellTransactions",
  description: "Display the Transactions table",
  components: {
    TableCell
  },
  computed: {
    isFetching() {
      return false;
    },
    link() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    },
    transactions() {
      return mockTransactions();
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