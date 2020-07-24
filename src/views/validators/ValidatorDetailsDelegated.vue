<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.delegated')"
          class="py-3 border-bottom com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 px-1 py-3 px-md-3">
        <div class="row mx-1 py-1 align-items-center border-bottom">
          <div class="col-12 col-md-2">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.self')"
            />
          </div>
          <div class="col-12 col-md-10 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="selfAmount.label"
            />
          </div>
        </div>
        <div class="row mx-1 py-1 align-items-center border-bottom">
          <div class="col-12 col-md-2">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.others')"
            />
          </div>
          <div class="col-12 col-md-10 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="othersAmount.label"
            />
          </div>
        </div>
        <div class="row mx-1 py-1 align-items-center com-font-s16-w700">
          <div class="col-12 col-md-2">
            <span v-text="$t('labels.total')" />
          </div>
          <div class="col-12 col-md-10 d-flex justify-content-md-end">
            <span v-text="totalsAmount" />
          </div>
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

import { coinsManager } from "Utils";

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
    coin() {
      return this.$config.generic.coins.find(coin => coin.stakeable);
    },
    othersAmount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : 0;
      let tot = 0;
      this.delegations
        .filter(delegation => delegation.delegator_address !== this.address)
        .forEach(delegation => {
          tot += parseFloat(delegation.balance.amount);
        });
      let amount = coinsManager(denom, exponent, tot);
      let formatAmount = this.getAmountLabel(amount.amount, amount.denom);
      return { label: `${formatAmount}`, value: amount.amount };
    },
    selfAmount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : "";
      let tot = 0;
      this.delegations
        .filter(delegation => delegation.delegator_address === this.address)
        .forEach(delegation => {
          tot += parseFloat(delegation.balance.amount);
        });
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
      return this.othersAmount.value + this.selfAmount.value;
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
