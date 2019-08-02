<template>
  <div class="row">
    <div class="col-12 col-md-6 px-1 py-3 px-md-3">
      <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.availables')"
        />
        <span
          class="com-font-s14-w400"
          v-text="availablesAmount.label"
        />
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.delegated')"
        />
        <span
          class="com-font-s14-w400"
          v-text="delegationsAmount.label"
        />
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.unbonded')"
        />
        <span
          class="com-font-s14-w400"
          v-text="unbondingDelegationsAmount.label"
        />
      </div>
      <div class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.rewards')"
        />
        <span
          class="com-font-s14-w400"
          v-text="rewardsAmount.label"
        />
      </div>
      <div class="py-2 d-flex flex-column flex-md-row justify-content-md-between align-items-md-center com-font-s16-w700">
        <span v-text="$t('labels.total')" />
        <span v-text="totalsAmount" />
      </div>
    </div>
    <div class="col-12 d-md-none">
      <hr>
    </div>
    <div class="col-md-1 d-none d-md-block border-left" />
    <div class="col-12 col-md-5 px-1 py-3 px-md-3">
      <AccountValuesChart
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
import AccountValuesChart from "./AccountValuesChart.vue";

import { coinsManager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "AccountValues",
  description: "Display the account token amounts",
  components: {
    AccountValuesChart
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
    coin() {
      return this.$config.generic.coins.find(coin => coin.stakeable);
    },
    availablesAmount() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (this.balances && this.balances.length > 0) {
        denom = this.balances[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.balances.forEach(balanace => {
          tot += parseFloat(balanace.amount);
        });
      }
      let amount = coinsManager(denom, exponent, tot);
      let formatAmount = this.getAmountLabel(amount.amount, amount.denom);
      return { label: `${formatAmount}`, value: amount.amount };
    },
    delegationsAmount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : 0;
      let tot = 0;
      if (this.delegations && this.delegations.length > 0) {
        this.delegations.forEach(delegation => {
          tot += parseFloat(delegation.shares);
        });
      }
      let amount = coinsManager(denom, exponent, tot);
      let formatAmount = this.getAmountLabel(amount.amount, amount.denom);
      return { label: `${formatAmount}`, value: amount.amount };
    },
    rewardsAmount() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (this.rewards && this.rewards.length > 0) {
        denom = this.rewards[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.rewards.forEach(reward => {
          tot += parseFloat(reward.amount);
        });
      }
      let amount = coinsManager(denom, exponent, tot);
      let formatAmount = this.getAmountLabel(amount.amount, amount.denom);
      return { label: `${formatAmount}`, value: amount.amount };
    },
    unbondingDelegationsAmount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : 0;
      let tot = 0;
      if (this.unbondings && this.unbondings.length > 0) {
        this.unbondings.forEach(unbonded => {
          unbonded.entries.forEach(entry => {
            tot += parseFloat(entry.balance);
          });
        });
      }
      let amount = coinsManager(denom, exponent, tot);
      let formatAmount = this.getAmountLabel(amount.amount, amount.denom);
      return { label: `${formatAmount}`, value: amount.amount };
    },
    totalsAmount() {
      let name = this.coin ? this.coin.name : "";
      let formatAmount = this.$n(this.totals, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${name}`;
    },
    totals() {
      return (
        this.availablesAmount.value +
        this.delegationsAmount.value +
        this.rewardsAmount.value +
        this.unbondingDelegationsAmount.value
      );
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
    }
  }
};
</script>
