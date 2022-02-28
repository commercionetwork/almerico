<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRateChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRatePosterComponent :rate="rate" />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateChartComponent from './ExchangeRateChartComponent.vue';
import ExchangeRatePosterComponent from './ExchangeRatePosterComponent.vue';
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'ExchangeRateTopContentComponent',
  components: {
    ExchangeRateChartComponent,
    ExchangeRatePosterComponent,
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
