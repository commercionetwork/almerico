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
import { coinConverter } from "Utils";

export default {
  name: "ValidatorDetailsDelegatorsRow",
  description: "Display a delegators list row of validators",
  props: {
    delegator: {
      type: Object,
      required: true,
      note: "Object representing a delegator"
    },
    totals: {
      type: Number,
      required: true,
      note: "All delegated tokens"
    }
  },
  computed: {
    address() {
      return this.delegator.address;
    },
    amount() {
      let amount = coinConverter({
        denom: this.$config.generic.coin.name.long,
        amount: this.delegator.shares
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    share() {
      let share = this.delegator.shares / this.totals;
      return this.$n(share, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  methods: {
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
