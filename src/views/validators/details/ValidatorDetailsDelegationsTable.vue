<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :hide-default-footer="true"
    disable-pagination
  >
    <template v-slot:top>
      <div
        class="py-2 text-center text-overline font-weight-bold"
        v-text="caption"
      />
    </template>
    <template v-slot:[`item.caption`]="{ item }">
      <span class="text-capitalize" v-text="item.caption" />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span
        class="text-uppercase font-weight-bold"
        v-text="formatTokens(item.amount)"
      />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';
import { coinAdapter } from '@/utils';

export default {
  name: 'ValidatorDetailsDelegationsTable',
  props: {
    delegations: {
      type: Object,
      default: () => ({}),
      note: 'The items to display',
    },
  },
  computed: {
    ...mapGetters('starting', {
      params: 'params',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    headers() {
      return [
        { text: 'Caption', value: 'caption' },
        { text: 'Amount', value: 'amount' },
      ];
    },
    items() {
      return Object.keys(this.delegations).map((key) => ({
        caption: key,
        amount: this.delegations[key],
      }));
    },
    caption() {
      return 'Delegated tokens';
    },
  },
  methods: {
    formatTokens(value) {
      return coinAdapter.format({ amount: value, denom: this.bondDenom });
    },
  },
};
</script>
