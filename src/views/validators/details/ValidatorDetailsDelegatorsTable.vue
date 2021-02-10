<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="3"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :caption="caption"
    class="elevation-2"
  >
    <template v-slot:[`item.delegator`]="{ item }">
      <router-link
        class="d-inline-block text-truncate text-decoration-none"
        style="max-width: 100px"
        v-text="item.delegator"
        :to="{
          name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
          params: { id: item.delegator },
        }"
      />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span class="font-weight-bold" v-text="formatTokens(item.amount)" />
    </template>
    <template v-slot:[`item.share`]="{ item }">
      <span class="font-weight-bold" v-text="formatPercent(item.share)" />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { ValidatorDelegatorsAggregator,numberIntlFormatter } from '@/utils';

export default {
  name: 'ValidatorDetailsDelegatorsTable',
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
    ...mapGetters('validators', {
      details: 'details',
    }),
    ...mapGetters('starting', {
      params: 'params',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    headers() {
      return [
        { text: 'Delegator', value: 'delegator' },
        { text: 'Amount', value: 'amount' },
        { text: 'Share', value: 'share' },
      ];
    },
    items() {
      return ValidatorDelegatorsAggregator.setAccount(this.account)
        .setValidator(this.details)
        .get();
    },
    caption() {
      return 'Delegator amounts';
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
