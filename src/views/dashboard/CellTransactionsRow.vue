<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, transaction.height)"
        v-text="transaction.height"
      />
    </td>
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTIONS_DETAILS, transaction.txhash)"
        v-text="transaction.txhash"
        class="d-block text-truncate"
        style="max-width: 120px;"
      />
    </td>
    <td
      class="align-middle"
      v-text="result"
    />
    <td
      class="align-middle"
      v-text="time"
    />
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "CellTransactionsRow",
  description: "Display a row of transactions cell",
  props: {
    transaction: {
      type: Object,
      required: true,
      note: "Object representing a transaction"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    result() {
      return this.transaction.logs[0].success ? "success" : "fail";
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleString();
    }
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
