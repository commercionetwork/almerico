<template>
  <v-card>
    <v-card-title>Work in progress</v-card-title>
  </v-card>
  <!-- <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else-if="!isLoading && error !== null" data-test="error">
    <v-col cols="12" class="pa-5">
      <v-alert border="left" prominent text type="error">
        <span class="text-body-1" v-text="errorMessage" />
      </v-alert>
    </v-col>
  </v-row>
  <div v-else data-test="content">
    <ExchangeRateHeaderComponent />
    <ExchangeRateTopBodyComponent :rate="exchangeRate" />
    <ExchangeRateBodyComponent :model="model" />
  </div> -->
</template>

<script>
import ExchangeRateBodyComponent from './ExchangeRateBodyComponent.vue';
import ExchangeRateHeaderComponent from './ExchangeRateHeaderComponent.vue';
import ExchangeRateTopBodyComponent from './ExchangeRateTopBodyComponent.vue';

import exchangeRateOverviewBuilder from './helpers/exchangeRateOverviewBuilder';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    ExchangeRateBodyComponent,
    ExchangeRateHeaderComponent,
    ExchangeRateTopBodyComponent,
  },
  data: () => ({
    exchangeRate: '',
    model: {
      circulatingData: [],
      circulatingHeaders: [],
      nonCirculatingData: [],
      nonCirculatingHeaders: [],
      maxData: [],
      maxHeaders: [],
    },
  }),
  computed: {
    ...mapGetters(['error']),
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
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : 'We are sorry but there was an error';
    },
  },
  methods: {
    ...mapActions('spreadsheet', {
      initSpreadsheet: 'initSpreadsheet',
    }),
  },
  created() {
    this.initSpreadsheet()
      .then(() => {
        return exchangeRateOverviewBuilder.build({
          accounts: this.accountsTokens,
          abrTokens: this.abrTokens,
          allTokens: this.allTokens,
          freezedTokens: this.freezedTokens,
          vbrTokens: this.vbrTokens,
          bondedTokens: this.pool.bonded_tokens,
          denom: this.params.bond_denom,
        });
      })
      .then((data) => {
        this.exchangeRate = data.exchangeRate;
        this.model.maxData = data.maxData;
        this.model.maxHeaders = data.maxHeaders;
        this.model.nonCirculatingData = data.nonCirculatingData;
        this.model.nonCirculatingHeaders = data.nonCirculatingHeaders;
        this.model.circulatingData = data.circulatingData;
        this.model.circulatingHeaders = data.circulatingHeaders;
      });
  },
};
</script>
