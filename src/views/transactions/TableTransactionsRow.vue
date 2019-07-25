<template>
  <tr class="text-center com-font-s13-w400">
    <td
      v-if="Config.transactions.table.columns.hash"
      class="align-middle"
      data-test="table-column-hash"
    >
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTION_DETAILS, transaction.txhash)"
        v-text="transaction.txhash"
        class="d-inline-block text-truncate"
        style="max-width: 150px;"
      />
    </td>
    <td
      v-if="Config.transactions.table.columns.type"
      class="align-middle"
      data-test="table-column-type"
    >
      <span v-text="type" />
    </td>
    <td
      v-if="Config.transactions.table.columns.result"
      class="align-middle"
      data-test="table-column-result"
    >
      <span v-text="result" />
    </td>
    <td
      v-if="Config.transactions.table.columns.amount"
      class="align-middle"
      data-test="table-column-amount"
    >
      <span v-text="amount" />
    </td>
    <td
      v-if="Config.transactions.table.columns.fee"
      class="align-middle"
      data-test="table-column-fee"
    >
      <span v-text="fee" />
    </td>
    <td
      v-if="Config.transactions.table.columns.block_height"
      class="align-middle"
      data-test="table-column-height"
    >
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, transaction.height)"
        v-text="transaction.height"
      />
    </td>
    <td
      v-if="Config.transactions.table.columns.date"
      class="align-middle"
      data-test="table-column-date"
    >
      <span v-text="date" />
    </td>
  </tr>
</template>

<script>
import Config from "Assets/json/config.json";

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
      ROUTE_NAMES,
      Config
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
      return this.transaction.logs.find(log => typeof log.success !== undefined)
        .success
        ? "success"
        : "fail";
    },
    date() {
      return new Date(this.transaction.timestamp).toLocaleDateString();
    },
    type() {
      let type = this.transaction.tx.value.msg.find(
        msg => typeof msg.type !== undefined
      ).type;
      return type.split("/").pop();
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
