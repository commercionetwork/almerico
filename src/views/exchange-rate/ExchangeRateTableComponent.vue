<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined class="pa-3">
        <v-card-text>
          <v-data-table
            dense
            :headers="headers"
            :items="items"
            :item-class="getRowStyle"
            :hide-default-footer="true"
            disable-pagination
          >
            <template v-slot:[`header.label`]="{ header }">
              <span v-text="header.text.toUpperCase()" />
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateTableBuilder from './helpers/ExchangeRateTableBuilder';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateTableComponent',
  data: () => ({
    items: [],
  }),
  computed: {
    ...mapGetters('spreadsheet', {
      abrTokens: 'abrTokens',
      accountsTokens: 'accountsTokens',
      allTokens: 'allTokens',
      vbrTokens: 'vbrTokens',
      isLoading: 'isLoading',
    }),
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
    }),
    headers() {
      return [
        {
          text: 'Total Supply',
          value: 'label',
          sortable: false,
          align: 'start',
        },
        {
          text: 'Quantity',
          value: 'quantity',
          sortable: false,
          align: 'end',
        },
        {
          text: 'Percentage',
          value: 'percentage',
          sortable: false,
          align: 'end',
        },
      ];
    },
  },
  methods: {
    getRowStyle(item) {
      return item.label.toLowerCase() === 'total' ||
        item.label.toLowerCase() === 'subtotal'
        ? 'subtotal-font-weight'
        : '';
    },
  },
  mounted() {
    this.items = ExchangeRateTableBuilder.build({
      accounts: this.accountsTokens,
      abrTokens: this.abrTokens,
      allTokens: this.allTokens,
      vbrTokens: this.vbrTokens,
      bondedTokens: this.pool.bonded_tokens,
      denom: this.params.bond_denom,
    }).tableData;
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
