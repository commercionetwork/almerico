<template>
  <v-card outlined>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:top>
        <div
          class="py-2 text-center text-overline font-weight-bold"
          v-text="caption"
        />
      </template>
      <template v-slot:[`item.date`]="{ item }">
        <span class="font-weight-bold" v-text="formatDate(item.date)" />
      </template>
      <template v-slot:[`item.moniker`]="{ item }">
        <router-link
          class="text-decoration-none"
          v-text="item.moniker"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: item.operator },
          }"
        />
      </template>
      <template v-slot:[`item.height`]="{ item }">
        <router-link
          class="text-decoration-none"
          v-text="item.height"
          :to="{
            name: ROUTES.NAMES.BLOCKS_DETAILS,
            params: { id: item.height },
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { AccountUnbondingsHandler, coinAdapter } from '@/utils';

export default {
  name: 'AccountDetailsUnbondings',
  data: () => ({
    ROUTES,
    sortBy: 'date',
    sortDesc: true,
  }),
  computed: {
    ...mapGetters('account', {
      unbondings: 'unbondings',
    }),
    ...mapGetters('validators', {
      validators: 'validators',
    }),
    ...mapGetters('starting', {
      params: 'params',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    headers() {
      return [
        { text: 'Date', value: 'date' },
        { text: 'Validator', value: 'moniker' },
        { text: 'Height', value: 'height' },
        { text: 'Amount', value: 'amount' },
      ];
    },
    items() {
      return AccountUnbondingsHandler.setUnbondings(this.unbondings)
        .setValidators(this.validators)
        .get();
    },
    caption() {
      return 'Unbonding Delegations';
    },
  },
  methods: {
    formatDate(value) {
      return new Date(value).toLocaleDateString();
    },
    formatTokens(value) {
      return coinAdapter.format({ amount: value, denom: this.bondDenom });
    },
  },
};
</script>
