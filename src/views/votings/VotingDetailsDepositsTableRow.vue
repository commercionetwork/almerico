<template>
  <tr class="com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, deposit.depositor)"
        v-text="deposit.depositor"
        class="d-block text-truncate"
        style="max-width: 200px;"
      />
    </td>
    <td class="align-middle text-right">
      <span v-text="amount" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "VotingDetailsDepositsTableRow",
  description: "Diplay a row of the deposits list",
  props: {
    deposit: {
      type: Object,
      required: true,
      note: "Object representing a deposit"
    }
  },
  data() {
    return { ROUTE_NAMES };
  },
  computed: {
    amount() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (this.deposit.amount.length > 0) {
        denom = this.deposit.amount[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.deposit.amount.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      let deposit = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(deposit.amount, deposit.denom);
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