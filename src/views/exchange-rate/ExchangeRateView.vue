<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.exchangeRate')" />
      <exchange-rate-view-overview />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateViewOverview from './ExchangeRateViewOverview.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateView',
  components: { ExchangeRateViewOverview },
  computed: {
    ...mapGetters('exchangeRate', [
      'error',
      'isLoading',
      'eventChart',
      'eventOverview',
    ]),
  },
  watch: {
    eventChart() {
      this.fetchChart();
    },
    eventOverview() {
      this.fetchOverview();
    },
  },
  created() {
    this.initExchangeRate();
  },
  methods: {
    ...mapActions('exchangeRate', [
      'initExchangeRate',
      'fetchChart',
      'fetchOverview',
    ]),
  },
};
</script>
