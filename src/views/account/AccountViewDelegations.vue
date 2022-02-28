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
        <template v-slot:top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.delegations')"
          />
        </template>
        <template v-slot:[`item.moniker`]="{ item }">
          <router-link
            class="text-decoration-none"
            v-text="item.moniker"
            :to="{
              name: ROUTES.NAME.VALIDATORS_DETAIL,
              params: { id: item.operator },
            }"
          />
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <span
            class="text-uppercase font-weight-bold"
            v-text="formatTokens(item.amount)"
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import accountDelegationsHelper from './helpers/accountDelegationsHelper';
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountViewDelegations',
  props: {
    delegations: {
      type: Array,
      required: true,
      note: 'The delegations to display',
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
  data: () => ({
    ROUTES,
    sortBy: 'amount',
    sortDesc: true,
  }),
  computed: {
    headers() {
      return [
        { text: this.$t('labels.validator'), value: 'moniker' },
        { text: this.$t('labels.amount'), value: 'amount' },
      ];
    },
    items() {
      return accountDelegationsHelper.build({
        delegations: this.delegations,
        validators: this.validators,
      });
    },
  },
  methods: {
    formatTokens(value) {
      const denom = this.params.bond_denom ? this.params.bond_denom : '';
      return coinAdapter.format({ amount: value, denom });
    },
  },
};
</script>
