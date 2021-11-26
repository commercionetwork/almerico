<template>
  <v-card outlined class="d-flex fill-height flex-column">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-list dense>
            <DetailItemComponent
              :label="$t('labels.tokens')"
              :content="tokens"
            />
            <DetailItemComponent
              :label="$t('labels.votingPower')"
              :content="votingPower"
            />
            <DetailItemComponent
              :label="$t('labels.commission')"
              :content="commission"
            />
            <DetailItemComponent
              :label="$t('labels.updateTime')"
              :content="updateTime"
            />
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list dense>
            <DetailItemComponent
              :label="$t('labels.website')"
              :content="website"
            />
            <DetailItemComponent
              :label="$t('labels.securityContact')"
              :content="securityContact"
            />
            <DetailItemComponent
              :label="$t('labels.identity')"
              :content="identity"
            />
            <DetailItemComponent
              :label="$t('labels.udetails')"
              :content="particulars"
            />
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent';

import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetailSpecComponent',
  components: { DetailItemComponent },
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
