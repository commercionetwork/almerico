<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <LoadingLinearComponent :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <ErrorMessageComponent :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <HeaderComponent :title="$t('titles.exchangeRate')" />
      <ExchangeRateTopContentComponent :rate="0" />
      <!-- <ExchangeRateBodyComponent :model="model" /> -->
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import ExchangeRateBodyComponent from './ExchangeRateBodyComponent.vue';
import ExchangeRateTopContentComponent from './ExchangeRateTopContentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import exchangeRateHelper from './helpers';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    ErrorMessageComponent,
    ExchangeRateBodyComponent,
    ExchangeRateTopContentComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  data: () => ({
    isBuilding: false,
    model: null,
  }),
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('exchangeRate', {
      error: 'error',
      isLoading: 'isLoading',
      abrTokens: 'abrTokens',
      accounts: 'accounts',
      freezedTokens: 'freezedTokens',
      pool: 'pool',
      supply: 'supply',
      vbrTokens: 'vbrTokens',
    }),
  },
  methods: {
    ...mapActions('exchangeRate', {
      initExchangeRate: 'initExchangeRate',
    }),
  },
  created() {
    this.initExchangeRate();
    this.model = exchangeRateHelper.getOverviewData({
      abrTokens: this.abrTokens,
      accounts: this.accounts,
      freezedTokens: this.freezedTokens,
      pool: this.pool,
      supply: this.supply,
      vbrTokens: this.vbrTokens,
      denom: this.params.bond_denom,
    });
  },
  updated() {
    console.log(this.model);
  },
};
</script>
