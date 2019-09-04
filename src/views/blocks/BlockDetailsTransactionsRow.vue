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
      <span v-text="type" />
    </td>
    <td class="align-middle">
      <span v-text="result" />
    </td>
    <td class="align-middle">
      <span v-text="amount" />
    </td>
    <td class="align-middle">
      <span v-text="fee" />
    </td>
    <td class="align-middle">
      <span v-text="date" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "BlockDetailsTransactionsRow",
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
    date() {
      return new Date(this.transaction.timestamp).toLocaleDateString();
    },
    result() {
      return this.transaction.logs.find(log => typeof log.success !== undefined)
        .success
        ? "success"
        : "fail";
    },
    type() {
      let type = this.transaction.tx.value.msg.find(
        msg => typeof msg.type !== undefined
      ).type;
      return type.split("/").pop();
    },
    amount() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      let amounts = [];
      this.transaction.tx.value.msg.forEach(message => {
        if (Array.isArray(message.value.amount)) {
          message.value.amount.forEach(amount => amounts.push(amount));
        } else if (message.value.amount instanceof Object) {
          amounts.push(message.value.amount);
        }
      });
      if (amounts.length > 0) {
        denom = amounts[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        amounts.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      let amount = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(amount.amount, amount.denom);
    },
    fee() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (
        Array.isArray(this.transaction.tx.value.fee.amount) &&
        this.transaction.tx.value.fee.amount.length > 0
      ) {
        denom = this.transaction.tx.value.fee.amount[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.transaction.tx.value.fee.amount.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      let fee = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(fee.amount, fee.denom);
    }
  },
  methods: {
    getAmountLabel(amount, denom) {
      let formatAmount = this.$n(amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${denom}`;
    },
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
