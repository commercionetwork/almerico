<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :hide-default-footer="true"
        disable-pagination
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
    <v-card-actions>
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script>
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountTokensBalance',
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
        { text: this.$t('labels.amount'), value: 'amount', width: '60%' },
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
