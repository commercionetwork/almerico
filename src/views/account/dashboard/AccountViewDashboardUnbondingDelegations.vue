<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items-per-page="5"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.unbondingDelegations')"
          />
        </template>
        <template #[`item.date`]="{ item }">
          <span class="font-weight-bold" v-text="formatDate(item.date)" />
        </template>
        <template #[`item.moniker`]="{ item }">
          <router-link
            class="text-decoration-none"
            :to="{
              name: ROUTES.NAME.VALIDATORS_DETAIL,
              params: { id: item.operator },
            }"
          >
            <span v-text="item.moniker" />
          </router-link>
        </template>
        <template #[`item.height`]="{ item }">
          <router-link
            class="text-decoration-none"
            :to="{
              name: ROUTES.NAME.BLOCKS_DETAIL,
              params: { id: item.height },
            }"
          >
            <span v-text="item.height" />
          </router-link>
        </template>
        <template #[`item.balance`]="{ item }">
          <span
            class="text-uppercase font-weight-bold"
            v-text="formatTokens(item.balance)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import accountUnbondingsHelper from '../helpers/accountUnbondingsHelper';
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountViewDashboardUnbondingDelegations',
  props: {
    unbondings: {
      type: Array,
      required: true,
      note: 'The unbondings to display',
    },
    params: {
      type: Object,
      required: true,
      note: 'The application parameters',
    },
    validators: {
      type: Array,
      required: true,
      note: 'The validators list',
    },
  },
  data() {
    return {
      ROUTES,
      sortBy: 'date',
      sortDesc: true,
    };
  },
  computed: {
    headers() {
      return [
        { text: this.$t('labels.completionDate'), value: 'date' },
        { text: this.$t('labels.validator'), value: 'moniker', width: '30%' },
        { text: this.$t('labels.height'), value: 'height', width: '15%' },
        { text: this.$t('labels.balance'), value: 'balance', width: '30%' },
      ];
    },
    items() {
      return accountUnbondingsHelper.build({
        unbondings: this.unbondings,
        validators: this.validators,
      });
    },
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    formatTokens(value) {
      const denom = this.params.bond_denom ? this.params.bond_denom : '';
      return coinAdapter.format({ amount: value, denom });
    },
  },
};
</script>
