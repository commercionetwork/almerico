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
          <template v-slot:[`header.type`]="{ header }">
            <span v-text="header.text.toUpperCase()" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card flat outlined class="pa-3">
        <v-card-text>
          <div
            class="text-uppercase text-h5 font-weight-black"
            v-text="exchangeRate"
          />
          <div
            class="text-caption error--text"
            v-text="'(1€ divided the % of Circulating Supply)'"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import { numberIntlFormatter, OverviewTableAdapter } from '@/utils';

export default {
  name: 'OverviewTable',
  computed: {
    ...mapGetters('overview', {
      abrTokens: 'abrTokens',
      accountsTokens: 'accountsTokens',
      allTokens: 'allTokens',
      vbrTokens: 'vbrTokens',
    }),
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
    }),
    headers() {
      return [
        { text: 'Token Type', value: 'type', sortable: false, align: 'start' },
        {
          text: 'Circulating Supply',
          value: 'circulating',
          sortable: false,
          align: 'end',
        },
        {
          text: 'Non Circulating Supply',
          value: 'nonCirculating',
          sortable: false,
          align: 'end',
        },
        { text: 'Total', value: 'total', sortable: false, align: 'end' },
      ];
    },
    items() {
      return this.overviewTableAdapter.tableData;
    },
    exchangeRate() {
      const rate = numberIntlFormatter.toDecimal({
        amount: this.overviewTableAdapter.exchangeRate,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
      return `exchange rate: ${rate}`;
    },
    overviewTableAdapter() {
      const overviewTableAdapter = new OverviewTableAdapter({
        accountsTokens: this.accountsTokens,
        abrTokens: this.abrTokens,
        allTokens: this.allTokens,
        vbrTokens: this.vbrTokens,
        bondedTokens: this.pool.bonded_tokens,
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

<style scoped>
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  padding-bottom: 10px;
  font-size: 18px !important;
}
::v-deep .subtotal-font-weight {
  font-weight: bold;
  background-color: rgba(56, 186, 140, 0.15);
}
</style>
