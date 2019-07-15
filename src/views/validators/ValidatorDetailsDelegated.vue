<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.delegated')"
          class="border-bottom com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 px-1 py-3 px-md-3">
        <div class="d-flex justify-content-between align-items-center border-bottom">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.self')"
          />
          <span
            class="com-font-s14-w400"
            v-text="selfAmount.label"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center border-bottom">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.others')"
          />
          <span
            class="com-font-s14-w400"
            v-text="othersAmount.label"
          />
        </div>
        <div class="py-2 d-flex justify-content-between align-items-center com-font-s16-w700">
          <span v-text="$t('labels.total')" />
          <span v-text="totalsAmount" />
        </div>
      </div>
      <div class="col-12 d-md-none">
        <hr>
      </div>
      <div class="col-md-1 d-none d-md-block border-left" />
      <div class="col-12 col-md-5 px-1 py-3 px-md-3">
        <ValidatorDetailsDelegatedChart
          :others="othersAmount.value"
          :self="selfAmount.value"
          :totals="totals"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ValidatorDetailsDelegatedChart from "./ValidatorDetailsDelegatedChart";

import { SETUP } from "Constants";
import { coinConverter } from "Utils";

export default {
  name: "ValidatorDetailsDelegated",
  description: "Display the validator delegated",
  components: {
    ValidatorDetailsDelegatedChart
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account's address"
    },
    delegations: {
      type: Array,
      required: true,
      note: "Delegations as validator to display"
    }
  },
  computed: {
    othersAmount() {
      let tot = 0;
      this.delegations
        .filter(delegation => delegation.delegator_address !== this.address)
        .forEach(delegation => {
          tot += parseFloat(delegation.shares);
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
    selfAmount() {
      let tot = 0;
      this.delegations
        .filter(delegation => delegation.delegator_address === this.address)
        .forEach(delegation => {
          tot += parseFloat(delegation.shares);
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
      return this.othersAmount.value + this.selfAmount.value;
    }
  }
};
</script>
