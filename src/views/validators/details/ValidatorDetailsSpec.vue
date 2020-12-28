<template>
  <v-card elevation="2">
    <v-card-text>
      <div class="pb-1">
        Voting power: <span class="font-weight-bold" v-text="votingPower" />
      </div>
      <div class="pb-1">
        Commission: <span class="font-weight-bold" v-text="commission" />
      </div>
      <div class="pb-1">
        Update time: <span class="font-weight-bold" v-text="updateTime" />
      </div>
      <div class="pb-1">Website: <span class="font-weight-bold" v-text="website" /></div>
      <div class="pb-1">
        Security contact:
        <span class="font-weight-bold" v-text="securityContact" />
      </div>
      <div class="pb-1">Details: <span class="font-weight-bold" v-text="particulars" /></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ValidatorDetailsSpec",
  computed: {
    ...mapGetters("starting", {
      pool: "pool",
    }),
    ...mapGetters("validators", {
      details: "details",
    }),
    commission() {
      return this.details.commission.commission_rates.rate
        ? this.formatPercent(this.details.commission.commission_rates.rate)
        : "-";
    },
    particulars() {
      return this.details.description.details || "-";
    },
    securityContact() {
      return this.details.description.security_contact || "-";
    },
    updateTime() {
      return (
        new Date(this.details.commission.update_time).toLocaleString() || "-"
      );
    },
    votingPower() {
      const bonded = this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
      const tokens = this.details.tokens ? parseFloat(this.details.tokens) : 0;
      const percent = bonded > 0 ? tokens / bonded : 0;
      return `${this.formatPercent(percent)} (${this.formatTokens(tokens)})`;
    },
    website() {
      return this.details.description.website || "-";
    },
  },
  methods: {
    formatPercent(value) {
      const options = {
        style: "percent",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      };
      return new Intl.NumberFormat(undefined, options).format(value);
    },
    formatTokens(value) {
      const options = {
        style: "decimal",
        maximumFractionDigits: 6,
      };
      return `${new Intl.NumberFormat(undefined, options).format(
        value / 1000000
      )} Commercio`;
    },
  },
};
</script>