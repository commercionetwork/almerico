<template>
  <v-row>
    <v-col cols="12" md="4">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="4">
      <exchange-rate-view-chart />
    </v-col>
    <v-col cols="12" md="4">
      <exchange-rate-view-poster />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateViewChart from './ExchangeRateViewChart.vue';
import ExchangeRateViewPoster from './ExchangeRateViewPoster.vue';

export default {
  name: 'ExchangeRateViewContentTop',
  components: {
    ExchangeRateViewChart,
    ExchangeRateViewPoster,
  },
};
</script>
