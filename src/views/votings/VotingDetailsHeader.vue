<template>
  <div class="p-3">
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.title')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="title"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.type')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="type"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.status')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="status"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.submitTime')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="submitTime"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.depositEndTime')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="depositEndTime"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.deposit')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="deposit"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.votingStartTime')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="votingStartTime"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.votingEndTime')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="votingEndTime"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12 col-md-3">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.description')"
        />
      </div>
      <div class="col-12 col-md-9">
        <span
          class="com-font-s14-w400"
          v-text="description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "VotingDetailsHeader",
  description: "Display the voting header",
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a voting"
    }
  },
  computed: {
    deposit() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (this.voting.total_deposit.length > 0) {
        denom = this.voting.total_deposit[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.voting.total_deposit.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      let deposit = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(deposit.amount, deposit.denom);
    },
    depositEndTime() {
      return new Date(this.voting.deposit_end_time).toLocaleString();
    },
    description() {
      return this.voting.content.value.description
        ? this.voting.content.value.description
        : "-";
    },
    status() {
      return this.voting.proposal_status ? this.voting.proposal_status : "-";
    },
    submitTime() {
      return new Date(this.voting.submit_time).toLocaleString();
    },
    title() {
      return this.voting.content.value.title
        ? this.voting.content.value.title
        : "-";
    },
    type() {
      return this.voting.content.type ? this.voting.content.type : "-";
    },
    votingEndTime() {
      return new Date(this.voting.voting_end_time).toLocaleString();
    },
    votingStartTime() {
      return new Date(this.voting.voting_start_time).toLocaleString();
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
    toAccountDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
