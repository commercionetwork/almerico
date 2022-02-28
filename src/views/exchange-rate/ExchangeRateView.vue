<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.exchangeRate')" />
      <ExchangeRateViewOverview />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import ExchangeRateViewOverview from './ExchangeRateViewOverview.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateView',
  components: {
    BaseLoadingLinear,
    ExchangeRateViewOverview,
    TheErrorMessage,
    TheHeaderContent,
  },
  computed: {
    ...mapGetters('exchangeRate', {
      error: 'error',
      isLoading: 'isLoading',
    }),
  },
  created() {
    this.initExchangeRate();
  },
  methods: {
    ...mapActions('exchangeRate', {
      initExchangeRate: 'initExchangeRate',
    }),
  },
};
</script>
