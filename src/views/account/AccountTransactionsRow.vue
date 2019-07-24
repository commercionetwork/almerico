<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTION_DETAILS, transaction.txhash)"
        v-text="transaction.txhash"
        class="d-inline-block text-truncate"
        style="max-width: 150px;"
      />
    </td>
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, transaction.height)"
        v-text="transaction.height"
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
  name: "AccountTransactionsRow",
  description: "Display a row of transactions list",
  props: {
    transaction: {
      type: Object,
      required: true,
      note: "The transaction to show"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
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
    time() {
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
          id: id
        }
      };
    }
  }
};
</script>
