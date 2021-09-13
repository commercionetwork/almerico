<template>
  <v-row>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="totalHeaders"
        :items="totalData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="nonCirculatingHeaders"
        :items="nonCirculatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="circulatingHeaders"
        :items="circulatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateTableComponent from './ExchangeRateTableComponent.vue';

import ExchangeRateTableBuilder from './helpers/ExchangeRateTableBuilder';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateSpreadsheetComponent',
  components: {
    ExchangeRateTableComponent,
  },
  data: () => ({
    circulatingData: [],
    circulatingHeaders: [],
    nonCirculatingData: [],
    nonCirculatingHeaders: [],
    totalData: [],
    totalHeaders: [],
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
  },
  methods: {
    getRowStyle(item) {
      return item.label.substr(0, 5).toLowerCase() === 'total' ||
        item.label.toLowerCase() === 'subtotal'
        ? 'subtotal-font-weight'
        : '';
    },
  },
  mounted() {
    ExchangeRateTableBuilder.build({
      accounts: this.accountsTokens,
      abrTokens: this.abrTokens,
      allTokens: this.allTokens,
      vbrTokens: this.vbrTokens,
      bondedTokens: this.pool.bonded_tokens,
      denom: this.params.bond_denom,
    }).then((data) => {
      this.totalData = data.totalData;
      this.totalHeaders = data.totalHeaders;
      this.nonCirculatingData = data.nonCirculatingData;
      this.nonCirculatingHeaders = data.nonCirculatingHeaders;
      this.circulatingData = data.circulatingData;
      this.circulatingHeaders = data.circulatingHeaders;
    });
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
