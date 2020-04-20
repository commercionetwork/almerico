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
    <td class="align-middle">
      <span v-text="type" />
    </td>
    <td class="align-middle">
      <span v-text="result" />
    </td>
    <td class="align-middle">
      <span v-text="fee" />
    </td>
    <td class="align-middle">
      <span v-text="time" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "AccountTransactionsTableRow",
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
    },
    result() {
      return this.resultStatus
        ? this.$t("labels.success")
        : this.$t("labels.fail");
    },
    resultStatus() {
      return this.transaction.code ? false : true;
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleDateString();
    },
    type() {
      if (this.transaction.tx.value.msg.length > 1)
        return this.$t("messages.multiTypes");
      let type = this.transaction.tx.value.msg.find(
        msg => typeof msg.type !== undefined
      ).type;
      return type.split("/").pop();
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
          id: id
        }
      };
    }
  }
};
</script>
