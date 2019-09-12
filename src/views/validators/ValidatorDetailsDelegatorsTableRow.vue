<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toAccountDetails()"
        v-text="address"
        class="d-block text-truncate"
        style="max-width: 120px;"
      />
    </td>
    <td class="align-middle">
      <span v-text="amount" />
    </td>
    <td class="align-middle">
      <span v-text="share" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "ValidatorDetailsDelegatorsTableRow",
  description: "Display a delegators list row of validators",
  props: {
    delegator: {
      type: Object,
      required: true,
      note: "Object representing a delegator"
    },
    totalShares: {
      type: Number,
      required: true,
      note: "All delegated tokens of a validator"
    }
  },
  computed: {
    address() {
      return this.delegator.address;
    },
    amount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : "";
      let shares = parseFloat(this.delegator.shares);

      let amount = coinsManager(denom, exponent, shares);
      return this.getAmountLabel(amount.amount, amount.denom);
    },
    coin() {
      return this.$config.generic.coins.find(coin => coin.stakeable);
    },
    share() {
      let share = this.delegator.shares / this.totalShares;
      return this.$n(share, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
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
    toAccountDetails() {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: this.address
        }
      };
    }
  }
};
</script>
