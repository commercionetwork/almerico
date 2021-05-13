<template>
  <v-row>
    <v-col cols="12">
      <v-card flat outlined class="pa-3">
        <v-data-table
          dense
          :headers="headers"
          :items="items"
          :item-class="getRowStyle"
          :hide-default-footer="true"
          disable-pagination
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { OverviewTableAdapter } from '@/utils';

export default {
  name: 'OverviewTable',
  computed: {
    ...mapGetters('overview', {
      abrTokens: 'abrTokens',
      accountsTokens: 'accountsTokens',
      vbrTokens: 'vbrTokens',
    }),
    ...mapGetters('starting', {
      params: 'params',
    }),
    headers() {
      return [
        { text: 'Token Type', value: 'type', sortable: false },
        { text: 'Circulating Supply', value: 'circulating', sortable: false },
        {
          text: 'Non Circulating Supply',
          value: 'nonCirculating',
          sortable: false,
        },
        { text: 'Total', value: 'total', sortable: false },
      ];
    },
    items() {
      const overviewTableAdapter = new OverviewTableAdapter({
        accountsTokens: this.accountsTokens,
        abrTokens: this.abrTokens,
        vbrTokens: this.vbrTokens,
        denom: this.params.bond_denom,
      });
      return overviewTableAdapter.build();
    },
  },
  methods: {
    getRowStyle(item) {
      return item.type.toLowerCase() === 'total' ||
        item.type.toLowerCase() === 'subtotal'
        ? 'subtotal-font-weight'
        : '';
    },
  },
};
</script>

<style>
.subtotal-font-weight {
  font-weight: bold;
  background-color: rgba(56, 186, 140, 0.2);
}
</style>
