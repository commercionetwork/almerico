<template>
  <v-row>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.totalHeaders"
        :items="model.totalData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.nonCirculatingHeaders"
        :items="model.nonCirculatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateTableComponent
        :headers="model.circulatingHeaders"
        :items="model.circulatingData"
        :getRowStyle="getRowStyle"
      />
    </v-col>
    <v-col cols="12">
      <ExchangeRateIndexComponent :exchangeRate="model.exchangeRate" />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateIndexComponent from './ExchangeRateIndexComponent.vue';
import ExchangeRateTableComponent from './ExchangeRateTableComponent.vue';

import ExchangeRateTableBuilder from './helpers/ExchangeRateTableBuilder';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateSpreadsheetComponent',
  components: {
    ExchangeRateIndexComponent,
    ExchangeRateTableComponent,
  },
  data: () => ({
    model: {
      circulatingData: [],
      circulatingHeaders: [],
      nonCirculatingData: [],
      nonCirculatingHeaders: [],
      totalData: [],
      totalHeaders: [],
      exchangeRate: '',
    },
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
      this.model.totalData = data.totalData;
      this.model.totalHeaders = data.totalHeaders;
      this.model.nonCirculatingData = data.nonCirculatingData;
      this.model.nonCirculatingHeaders = data.nonCirculatingHeaders;
      this.model.circulatingData = data.circulatingData;
      this.model.circulatingHeaders = data.circulatingHeaders;
      this.model.exchangeRate = data.exchangeRate;
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
