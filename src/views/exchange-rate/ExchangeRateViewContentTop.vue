<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRateViewChart />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRateViewPoster :rate="rate" />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateViewChart from './ExchangeRateViewChart.vue';
import ExchangeRateViewPoster from './ExchangeRateViewPoster.vue';
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'ExchangeRateViewContentTop',
  components: {
    ExchangeRateViewChart,
    ExchangeRateViewPoster,
    TheLatestHeight,
  },
  props: {
    rate: {
      Type: Number,
      default: 0,
      note: 'The exchange rate value',
    },
  },
};
</script>
