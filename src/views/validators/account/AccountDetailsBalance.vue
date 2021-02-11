<template>
  <v-data-table
    :headers="headers"
    :items="balances"
    :items-per-page="5"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :caption="caption"
    class="elevation-2"
  >
    <template v-slot:[`item.denom`]="{ item }">
      <span class="info--text" v-text="item.denom" />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span class="font-weight-bold" v-text="formatTokens(item.amount)" />
    </template>
  </v-data-table>
</template>

<script>
import { numberIntlFormatter } from '@/utils';

export default {
  name: 'AccountDetailsBalance',
  props: {
    balances: {
      type: Array,
      required: true,
      note: 'The amounts to display',
    },
  },
  data: () => ({
    sortBy: 'amount',
    sortDesc: true,
  }),
  computed: {
    caption() {
      return 'Balance';
    },
    headers() {
      return [
        { text: 'Name', value: 'denom' },
        { text: 'Amount', value: 'amount' },
      ];
    },
  },
  methods: {
    formatTokens(value) {
      return numberIntlFormatter.toDecimal({
        amount: value,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    },
  },
};
</script>
