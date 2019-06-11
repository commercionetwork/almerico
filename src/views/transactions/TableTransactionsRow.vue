<template>
  <tr class="text-center com-font-s12-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTIONS_DETAILS, transaction.txhash)"
        v-text="transaction.txhash"
        class="d-inline-block text-truncate"
        style="max-width: 150px;"
      />
    </td>
    <td
      class="align-middle"
      v-text="type"
    />
    <td
      class="align-middle"
      v-text="result"
    />
    <td
      class="align-middle"
      v-text="fee"
    />
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, transaction.height)"
        v-text="transaction.height"
      />
    </td>
    <td
      class="align-middle"
      v-text="time"
    />
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "TableTransactionsRow",
  description: "Display a row of transactions table",
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
    fee() {
      return `${this.transaction.tx.value.fee.amount} COMM`;
    },
    result() {
      return this.transaction.logs[0].success ? "success" : "fail";
    },
    time() {
      let time = "";
      let seconds = (new Date() - new Date(this.transaction.timestamp)) / 1000;
      switch (true) {
        case seconds >= 3600:
          time = `${(seconds / 3600).toFixed(0)}h`;
          break;
        case seconds >= 60:
          time = `${(seconds / 60).toFixed(0)}m`;
          break;
        default:
          time = `${seconds.toFixed(0)}s`;
      }

      return `${time} ago`;
    },
    type() {
      return this.transaction.tags[0].value;
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
