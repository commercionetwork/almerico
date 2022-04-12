<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-list dense>
            <BaseDetailItem :label="$t('labels.tokens')" :content="tokens" />
            <BaseDetailItem
              :label="$t('labels.votingPower')"
              :content="votingPower"
            />
            <BaseDetailItem
              :label="$t('labels.commission')"
              :content="commission"
            />
            <BaseDetailItem
              :label="$t('labels.updateTime')"
              :content="updateTime"
            />
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list dense>
            <BaseDetailItem :label="$t('labels.website')" :content="website" />
            <BaseDetailItem
              :label="$t('labels.securityContact')"
              :content="securityContact"
            />
            <BaseDetailItem
              :label="$t('labels.identity')"
              :content="identity"
            />
            <BaseDetailItem
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
import BaseDetailItem from '@/components/BaseDetailItem';

import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailAttributes',
  components: { BaseDetailItem },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('validators', ['detail', 'pool']),
    commission() {
      return this.detail
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.detail.commission.commission_rates.rate)
        : '-';
    },
    identity() {
      return this.detail && this.detail.description.identity
        ? this.detail.description.identity
        : '-';
    },
    particulars() {
      return this.detail && this.detail.description.detail
        ? this.detail.description.detail
        : '-';
    },
    securityContact() {
      return this.detail && this.detail.description.security_contact
        ? this.detail.description.security_contact
        : '-';
    },
    tokens() {
      return this.detail
        ? coinAdapter.format({
            amount: parseFloat(this.detail.tokens),
            denom: this.stakingParams.bond_denom,
          })
        : '-';
    },
    updateTime() {
      return this.detail
        ? new Date(this.detail.commission.update_time).toLocaleString()
        : '-';
    },
    votingPower() {
      const bonded = this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
      const tokens = this.detail ? parseFloat(this.detail.tokens) : 0;
      const percent = !isNaN(bonded) || bonded > 0 ? tokens / bonded : 0;
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(percent);
    },
    website() {
      return this.detail && this.detail.description.website
        ? this.detail.description.website
        : '-';
    },
  },
};
</script>
