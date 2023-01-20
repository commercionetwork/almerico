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
    ...mapGetters('validators', ['detail']),
    commission() {
      return (
        new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(this.detail.commission) || '-'
      );
    },
    identity() {
      return this.detail.identity || '-';
    },
    particulars() {
      return this.detail.details || '-';
    },
    securityContact() {
      return this.detail.security_contact || '-';
    },
    tokens() {
      return (
        coinAdapter.format({
          amount: parseFloat(this.detail.tokens),
          denom: this.stakingParams.bond_denom,
        }) || '-'
      );
    },
    updateTime() {
      return new Date(this.detail.update_time).toLocaleString() || '-';
    },
    votingPower() {
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(this.detail.power);
    },
    website() {
      return this.detail.website || '-';
    },
  },
};
</script>
