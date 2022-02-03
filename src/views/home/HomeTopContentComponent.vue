<template>
  <v-row>
    <v-col cols="12" md="6" xl="3">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomePricePosterComponent />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomePriceChartComponent />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomeTokensChartComponent />
    </v-col>
  </v-row>
</template>

<script>
import HomePriceChartComponent from './HomePriceChartComponent.vue';
import HomePricePosterComponent from './HomePricePosterComponent.vue';
import HomeTokensChartComponent from './HomeTokensChartComponent.vue';
import LatestHeightComponent from '@/components/LatestHeightComponent';

export default {
  name: 'HomeTopContentComponent',
  components: {
    HomePriceChartComponent,
    HomePricePosterComponent,
    HomeTokensChartComponent,
    LatestHeightComponent,
  },
};
</script>
