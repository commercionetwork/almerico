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

import exchangeRateTableBuilder from './helpers/exchangeRateTableBuilder';
import { OVERVIEW } from '@/constants';
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
      freezedTokens: 'freezedTokens',
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
      switch (item.type) {
        case OVERVIEW.ROW_STYLE.COMING_SOON:
          return 'coming-soon-row';
        case OVERVIEW.ROW_STYLE.HIGHLIGHTED:
          return 'highlighted-row';
        default:
          return '';
      }
    },
  },
  mounted() {
    exchangeRateTableBuilder
      .build({
        accounts: this.accountsTokens,
        abrTokens: this.abrTokens,
        allTokens: this.allTokens,
        freezedTokens: this.freezedTokens,
        vbrTokens: this.vbrTokens,
        bondedTokens: this.pool.bonded_tokens,
        denom: this.params.bond_denom,
      })
      .then((data) => {
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
::v-deep .coming-soon-row {
  color: #ff6600;
}

::v-deep .highlighted-row {
  font-weight: bold;
  background-color: rgba(56, 186, 140, 0.15);
}
</style>
