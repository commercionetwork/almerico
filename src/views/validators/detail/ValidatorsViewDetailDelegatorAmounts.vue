<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="2"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="caption"
          />
        </template>
        <template #[`item.delegator`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 9rem"
            :to="{
              name: ROUTES.NAME.ACCOUNT,
              params: { id: item.delegator },
            }"
          >
            <span v-text="item.delegator" />
          </router-link>
        </template>
        <template #[`item.amount`]="{ item }">
          <span
            class="text-uppercase font-weight-bold"
            v-text="formatTokens(item.amount)"
          />
        </template>
        <template #[`item.share`]="{ item }">
          <span class="font-weight-bold" v-text="formatPercent(item.share)" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import validatorsDetailDelegatorsHelper from './helpers/validatorsDetailDelegatorsHelper';
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailDelegatorAmounts',
  data() {
    return {
      ROUTES,
      sortBy: 'share',
      sortDesc: true,
    };
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('validators', ['delegations', 'detail']),
    bondDenom() {
      return this.stakingParams.bond_denom ? this.stakingParams.bond_denom : '';
    },
    headers() {
      return [
        { text: this.$t('labels.delegator'), value: 'delegator' },
        { text: this.$t('labels.amount'), value: 'amount', width: '40%' },
        { text: this.$t('labels.share'), value: 'share', width: '18%' },
      ];
    },
    items() {
      return this.detail
        ? validatorsDetailDelegatorsHelper.build({
            account: this.detail.account,
            detail: this.detail,
            delegations: this.delegations,
          })
        : [];
    },
    caption() {
      return this.$t('titles.delegatorAmounts');
    },
  },
  methods: {
    formatPercent(value) {
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(value);
    },
    formatTokens(value) {
      return coinAdapter.format({ amount: value, denom: this.bondDenom });
    },
  },
};
</script>
