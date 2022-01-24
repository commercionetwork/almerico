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
        :footer-props="{ itemsPerPageOptions: [2] }"
      >
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="caption"
          />
        </template>
        <template v-slot:[`item.delegator`]="{ item }">
          <router-link
            class="d-inline-block text-truncate text-decoration-none font-monotype"
            style="max-width: 100px"
            v-text="item.delegator"
            :to="{
              name: ROUTES.NAME.ACCOUNT,
              params: { id: item.delegator },
            }"
          />
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <span
            class="text-uppercase font-weight-bold"
            v-text="formatTokens(item.amount)"
          />
        </template>
        <template v-slot:[`item.share`]="{ item }">
          <span class="font-weight-bold" v-text="formatPercent(item.share)" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';
import validatorsDetailDelegatorsHelper from './helpers/validatorsDetailDelegatorsHelper';

export default {
  name: 'ValidatorsDetailDelegatorsComponent',
  props: {
    account: {
      type: String,
      required: true,
      note: 'The account address',
    },
  },
  data: () => ({
    ROUTES,
    sortBy: 'share',
    sortDesc: true,
  }),
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('validators', {
      delegations: 'delegations',
      detail: 'detail',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    headers() {
      return [
        { text: this.$t('labels.delegator'), value: 'delegator' },
        { text: this.$t('labels.amount'), value: 'amount' },
        { text: this.$t('labels.share'), value: 'share' },
      ];
    },
    items() {
      return validatorsDetailDelegatorsHelper.build({
        account: this.account,
        detail: this.detail,
        delegations: this.delegations,
      });
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
