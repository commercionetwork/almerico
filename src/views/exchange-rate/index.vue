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
      <ExchangeRateTopContentComponent />
      <v-row>
        <v-col cols="12">
          <v-card outlined>
            <v-card-title>WORK IN PROGRESS</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import ExchangeRateTopContentComponent from './ExchangeRateTopContentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    ErrorMessageComponent,
    ExchangeRateTopContentComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('exchangeRate', {
      abrTokens: 'abrTokens',
      accounts: 'accounts',
      error: 'error',
      freezedTokens: 'freezedTokens',
      isLoading: 'isLoading',
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
  },
};
</script>
