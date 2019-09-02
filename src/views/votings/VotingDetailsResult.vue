<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.result')"
          class="py-3 border-bottom com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 px-1 py-3 px-md-3">
        <div class="row mx-1 py-1 align-items-center border-bottom">
          <div class="col-12 col-md-3">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.yes')"
            />
          </div>
          <div class="col-12 col-md-9 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="getAmountLabel(voteYes)"
            />
          </div>
        </div>
        <div class="row mx-1 py-1 align-items-center border-bottom">
          <div class="col-12 col-md-3">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.abstain')"
            />
          </div>
          <div class="col-12 col-md-9 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="getAmountLabel(voteAbstain)"
            />
          </div>
        </div>
        <div class="row mx-1 py-1 align-items-center border-bottom">
          <div class="col-12 col-md-3">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.no')"
            />
          </div>
          <div class="col-12 col-md-9 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="getAmountLabel(voteNo)"
            />
          </div>
        </div>
        <div class="row mx-1 py-1 align-items-center">
          <div class="col-12 col-md-3">
            <span
              class="com-font-s14-w700"
              v-text="$t('labels.noWithVeto')"
            />
          </div>
          <div class="col-12 col-md-9 d-flex justify-content-md-end">
            <span
              class="com-font-s14-w400"
              v-text="getAmountLabel(voteNoWithVeto)"
            />
          </div>
        </div>
      </div>

      <div class="col-12 d-md-none">
        <hr>
      </div>
      <div class="col-md-1 d-none d-md-block border-left" />

      <div class="col-12 col-md-5 px-1 py-3 px-md-3">
        <VotingDetailsResultChart
          v-if="$config.voting_details.result.chart"
          :abstain="voteAbstain"
          :no="voteNo"
          :noWithVeto="voteNoWithVeto"
          :yes="voteYes"
          data-test="chart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VotingDetailsResultChart from "./VotingDetailsResultChart.vue";

import { coinsManager } from "Utils";

export default {
  name: "VotingDetailsResult",
  description: "Display the voting data",
  components: {
    VotingDetailsResultChart
  },
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a voting"
    }
  },
  computed: {
    coin() {
      return this.$config.generic.coins.find(coin => coin.stakeable);
    },
    voteAbstain() {
      return parseFloat(this.voting.final_tally_result.abstain);
    },
    voteNo() {
      return parseFloat(this.voting.final_tally_result.no);
    },
    voteNoWithVeto() {
      return parseFloat(this.voting.final_tally_result.no_with_veto);
    },
    voteYes() {
      return parseFloat(this.voting.final_tally_result.yes);
    }
  },
  methods: {
    getAmountLabel(vote) {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : 0;
      let amount = coinsManager(denom, exponent, vote);
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `${formatAmount} ${amount.denom}`;
    }
  }
};
</script>
