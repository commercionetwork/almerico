<template>
  <tr class="text-center com-font-s13-w400">
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
      v-text="amount"
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
    amount() {
      let comm = 0;
      if (typeof(this.transaction.tx.value.msg[0].value.amount) === 'object') {
        comm = this.transaction.tx.value.msg[0].value.amount.amount / 1000000;
      }
      if (Array.isArray(this.transaction.tx.value.msg[0].value.amount)) {
        comm =
          this.transaction.tx.value.msg[0].value.amount[0].amount / 1000000;
      }
      let formatComm = this.$n(comm, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatComm} COMM`;
    },
    fee() {
      let fee = 0;
      if (this.transaction.tx.value.fee.amount) {
        fee = this.transaction.tx.value.fee.amount / 1000000;
      }
      if (Array.isArray(this.transaction.tx.value.fee.amount)) {
        fee = this.transaction.tx.value.fee.amount[0].amount / 1000000;
      }
      let formatFee = this.$n(fee, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatFee} COMM`;
    },
    result() {
      return this.transaction.logs[0].success ? "success" : "fail";
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleString();
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
