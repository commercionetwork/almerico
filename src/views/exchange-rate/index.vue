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
      <ExchangeRateOverviewComponent />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import ExchangeRateOverviewComponent from './ExchangeRateOverviewComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    ErrorMessageComponent,
    ExchangeRateOverviewComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('exchangeRate', {
      error: 'error',
      isLoading: 'isLoading',
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
