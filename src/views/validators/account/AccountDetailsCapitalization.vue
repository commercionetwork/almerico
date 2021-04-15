<template>
  <v-card outlined>
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
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { coinAdapter } from '@/utils';

export default {
  name: 'AccountDetailsCapitalization',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The amounts to display',
    },
  },
  computed: {
    ...mapGetters('starting', {
      params: 'params',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    caption() {
      return 'Capitalization';
    },
    headers() {
      return [
        { text: 'Caption', value: 'caption' },
        { text: 'Amount', value: 'amount' },
      ];
    },
    items() {
      return Object.keys(this.capitalization).map((key) => ({
        caption: key,
        amount: this.capitalization[key],
      }));
    },
  },
  methods: {
    formatTokens(value) {
      return value > 0
        ? coinAdapter.format({ amount: value, denom: this.bondDenom })
        : '-';
    },
  },
};
</script>
