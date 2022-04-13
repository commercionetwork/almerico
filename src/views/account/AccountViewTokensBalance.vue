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
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.allTokensBalance')"
          />
        </template>
        <template #[`item.denom`]="{ item }">
          <span class="text-uppercase font-weight-bold" v-text="item.denom" />
        </template>
        <template #[`item.amount`]="{ item }">
          <span class="font-weight-bold" v-text="item.amount" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountViewTokensBalance',
  props: {
    balances: {
      type: Array,
      required: true,
      note: 'The amounts to display',
    },
  },
  data() {
    return {
      sortBy: 'denom',
      sortDesc: false,
    };
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
