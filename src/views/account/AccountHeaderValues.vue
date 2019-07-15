<template>
  <div class="row bg-white">
    <div class="col-12 col-md-6 px-1 py-3 px-md-3">
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.availables')"
        />
        <span
          class="com-font-s14-w400"
          v-text="availablesAmount.label"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.delegated')"
        />
        <span
          class="com-font-s14-w400"
          v-text="delegationsAmount.label"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.unbonded')"
        />
        <span
          class="com-font-s14-w400"
          v-text="unbondingDelegationsAmount.label"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.rewards')"
        />
        <span
          class="com-font-s14-w400"
          v-text="rewardsAmount.label"
        />
      </div>
      <div class="py-2 d-flex justify-content-between align-items-center com-font-s16-w700">
        <span v-text="$t('labels.total')" />
        <span v-text="totalsAmount" />
      </div>
    </div>
    <div class="col-12 col-md-6 px-1 py-3 px-md-3">
      <AccountHeaderChart
        :availables="availablesAmount.value"
        :delegated="delegationsAmount.value"
        :rewards="rewardsAmount.value"
        :unbonded="unbondingDelegationsAmount.value"
        :totals="totals"
      />
    </div>
  </div>
</template>


<script>
import AccountHeaderChart from "./AccountHeaderChart.vue";

import { SETUP } from "Constants";
import { coinConverter } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "AccountHeaderValues",
  description: "Display the account token amounts",
  components: {
    AccountHeaderChart
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Delegations list"
    },
    rewards: {
      type: Array,
      required: true,
      note: "Rewards list"
    },
    unbondings: {
      type: Array,
      required: true,
      note: "Unbonding delegations list"
    }
  },
  computed: {
    ...mapGetters("account", {
      balances: "balances"
    }),
    availablesAmount() {
      let amount = {
        denom: SETUP.COIN,
        amount: 0
      };
      if (this.balances && this.balances.length > 0) {
        amount = coinConverter(this.balances[0]);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return { label: `${formatAmount} ${amount.denom}`, value: amount.amount };
    },
    delegationsAmount() {
      let tot = 0;
      this.delegations.forEach(element => {
        tot += parseFloat(element.shares);
      });
      let amount = coinConverter({
        denom: SETUP.MICRO_COIN,
        amount: tot
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return { label: `${formatAmount} ${amount.denom}`, value: amount.amount };
    },
    rewardsAmount() {
      let tot = 0;
      this.rewards.forEach(element => {
        tot += parseFloat(element.amount);
      });
      let amount = coinConverter({
        denom: SETUP.MICRO_COIN,
        amount: tot
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return { label: `${formatAmount} ${amount.denom}`, value: amount.amount };
    },
    unbondingDelegationsAmount() {
      let tot = 0;
      this.unbondings.forEach(element => {
        element.entries.forEach(entry => {
          tot += parseFloat(entry.balance);
        });
      });
      let amount = coinConverter({
        denom: SETUP.MICRO_COIN,
        amount: tot
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return { label: `${formatAmount} ${amount.denom}`, value: amount.amount };
    },
    totalsAmount() {
      let formatAmount = this.$n(this.totals, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${SETUP.COIN}`;
    },
    totals() {
      return (
        this.availablesAmount.value +
        this.delegationsAmount.value +
        this.rewardsAmount.value +
        this.unbondingDelegationsAmount.value
      );
    }
  }
};
</script>
