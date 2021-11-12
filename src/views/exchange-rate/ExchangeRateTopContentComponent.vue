<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRateChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <ExchangeRatePosterComponent rate="-" />
    </v-col>
  </v-row>
</template>

<script>
import ExchangeRateChartComponent from './ExchangeRateChartComponent.vue'
import ExchangeRatePosterComponent from './ExchangeRatePosterComponent.vue'
import LatestHeightComponent from '@/components/LatestHeightComponent';

export default {
name: 'ExchangeRateTopContentComponent',
  components: {
    ExchangeRateChartComponent,
    ExchangeRatePosterComponent,
    LatestHeightComponent,
  },
}
</script>
