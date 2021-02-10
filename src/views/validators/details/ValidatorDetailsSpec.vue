<template>
  <v-card elevation="2">
    <v-card-text>
      <div class="pb-1">
        Tokens: <span class="font-weight-bold" v-text="tokens" />
      </div>
      <div class="pb-1">
        Voting power: <span class="font-weight-bold" v-text="votingPower" />
      </div>
      <div class="pb-1">
        Commission: <span class="font-weight-bold" v-text="commission" />
      </div>
      <div class="pb-1">
        Update time: <span class="font-weight-bold" v-text="updateTime" />
      </div>
      <div class="pb-1">
        Website: <span class="font-weight-bold" v-text="website" />
      </div>
      <div class="pb-1">
        Security contact:
        <span class="font-weight-bold" v-text="securityContact" />
      </div>
      <div class="pb-1">
        Identity:
        <span class="font-weight-bold" v-text="identity" />
      </div>
      <div class="pb-1">
        Details: <span class="font-weight-bold" v-text="particulars" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { numberIntlFormatter } from '@/utils';

export default {
  name: 'ValidatorDetailsSpec',
  computed: {
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
    }),
    ...mapGetters('validators', {
      details: 'details',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    commission() {
      return this.details.commission.commission_rates.rate
        ? this.formatPercent(this.details.commission.commission_rates.rate)
        : '-';
    },
    identity() {
      return this.details.description.identity || '-';
    },
    particulars() {
      return this.details.description.details || '-';
    },
    securityContact() {
      return this.details.description.security_contact || '-';
    },
    tokens() {
      return this.formatTokens(parseFloat(this.details.tokens));
    },
    updateTime() {
      return (
        new Date(this.details.commission.update_time).toLocaleString() || '-'
      );
    },
    votingPower() {
      const bonded = parseFloat(this.pool.bonded_tokens);
      const tokens = parseFloat(this.details.tokens);
      const percent = !isNaN(bonded) || bonded > 0 ? tokens / bonded : 0;
      return this.formatPercent(percent);
    },
    website() {
      return this.details.description.website || '-';
    },
  },
  methods: {
    formatPercent(value) {
      return numberIntlFormatter.toPercent({
        amount: value,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
    formatTokens(value) {
      const tokens = numberIntlFormatter.toDecimal({
        amount: value,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      return `${tokens} ${this.bondDenom}`;
    },
  },
};
</script>
