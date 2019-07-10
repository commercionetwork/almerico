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
import { coinConverter } from "Utils";

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
      let amount = {
        denom: "",
        amount: 0
      };
      if (
        Array.isArray(this.transaction.tx.value.msg[0].value.amount) &&
        this.transaction.tx.value.msg[0].value.amount.length > 0
      ) {
        amount = coinConverter(
          this.transaction.tx.value.msg[0].value.amount[0]
        );
      } else if (
        this.transaction.tx.value.msg[0].value.amount instanceof Object
      ) {
        amount = coinConverter(this.transaction.tx.value.msg[0].value.amount);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    fee() {
      let fee = {
        denom: "",
        amount: 0
      };
      if (
        Array.isArray(this.transaction.tx.value.fee.amount) &&
        this.transaction.tx.value.fee.amount.length > 0
      ) {
        fee = coinConverter(this.transaction.tx.value.fee.amount[0]);
      }

      let formatFee = this.$n(fee.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatFee} ${fee.denom}`;
    },
    result() {
      return this.transaction.logs[0].success ? "success" : "fail";
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleString();
    },
    type() {
      return this.transaction.tx.value.msg &&
        this.transaction.tx.value.msg.length > 0
        ? this.transaction.tx.value.msg[0].type.split("/").pop()
        : "-";
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
