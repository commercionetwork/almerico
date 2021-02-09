<template>
  <v-data-table
    :caption="caption"
    :headers="headers"
    :items="items"
    :hide-default-footer="true"
    disable-pagination
    class="elevation-2"
  >
    <template v-slot:[`item.caption`]="{ item }">
      <span class="text-capitalize" v-text="item.caption" />
    </template>
    <template v-slot:[`item.amount`]="{ item }">
      <span class="font-weight-bold" v-text="formatTokens(item.amount)" />
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AccountDetailsCapitalization',
  props: {
    amounts: {
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
      return Object.keys(this.amounts).map((key) => ({
        caption: key,
        amount: this.amounts[key],
      }));
    },
  },
  methods: {
    formatTokens(value) {
      const options = {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
      return `${new Intl.NumberFormat(undefined, options).format(value)} ${
        this.bondDenom
      }`;
    },
  },
};
</script>
