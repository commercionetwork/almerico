<template>
  <v-card outlined>
    <v-data-table :headers="headers" :items="items" :items-per-page="3">
      <template v-slot:top>
        <div
          class="py-2 text-center text-overline font-weight-bold"
          v-text="$t('titles.allTokensBalance')"
        />
      </template>
      <template v-slot:[`item.denom`]="{ item }">
        <span class="text-uppercase font-weight-bold" v-text="item.denom" />
      </template>
      <template v-slot:[`item.amount`]="{ item }">
        <span class="font-weight-bold" v-text="item.amount" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountBankComponent',
  props: {
    balances: {
      type: Array,
      required: true,
      note: 'The amounts to display',
    },
  },
  computed: {
    headers() {
      return [
        { text: this.$t('labels.name'), value: 'denom' },
        { text: this.$t('labels.amount'), value: 'amount' },
      ];
    },
    items() {
      return this.balances.length > 0
        ? coinAdapter.convertList(this.balances)
        : [];
    },
  },
};
</script>
