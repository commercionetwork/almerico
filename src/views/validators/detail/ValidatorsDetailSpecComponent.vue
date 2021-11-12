<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.tokens')"
            :value="tokens"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.votingPower')"
            :value="votingPower"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.commission')"
            :value="commission"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.updateTime')"
            :value="updateTime"
          />
        </v-col>
        <v-col cols="12" md="6">
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.website')"
            :value="website"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.securityContact')"
            :value="securityContact"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.identity')"
            :value="identity"
          />
          <ValidatorsDetailSpecDataComponent
            :label="$t('labels.udetails')"
            :value="particulars"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import ValidatorsDetailSpecDataComponent from './ValidatorsDetailSpecDataComponent.vue';
import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetailSpecComponent',
  components: { ValidatorsDetailSpecDataComponent },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('validators', {
      detail: 'detail',
      pool: 'pool',
    }),
    commission() {
      return this.detail.commission.commission_rates.rate
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.detail.commission.commission_rates.rate)
        : '-';
    },
    identity() {
      return this.detail.description.identity || '-';
    },
    particulars() {
      return this.detail.description.detail || '-';
    },
    securityContact() {
      return this.detail.description.security_contact || '-';
    },
    tokens() {
      return coinAdapter.format({
        amount: parseFloat(this.detail.tokens),
        denom: this.params.bond_denom,
      });
    },
    updateTime() {
      return (
        new Date(this.detail.commission.update_time).toLocaleString() || '-'
      );
    },
    votingPower() {
      const bonded = parseFloat(this.pool.bonded_tokens);
      const tokens = parseFloat(this.detail.tokens);
      const percent = !isNaN(bonded) || bonded > 0 ? tokens / bonded : 0;
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(percent);
    },
    website() {
      return this.detail.description.website || '-';
    },
  },
};
</script>
