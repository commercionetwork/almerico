<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :caption="caption"
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
      const options = {
        style: 'decimal',
        maximumFractionDigits: 0,
      };
      return `${new Intl.NumberFormat(undefined, options).format(value)} ${
        this.bondDenom
      }`;
    },
  },
};
</script>
