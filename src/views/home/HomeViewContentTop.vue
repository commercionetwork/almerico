<template>
  <v-row>
    <v-col cols="12" md="6" xl="3">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <home-view-poster-price />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <home-view-chart-price />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <home-view-chart-tokens />
    </v-col>
  </v-row>
</template>

<script>
import HomeViewChartPrice from './HomeViewChartPrice.vue';
import HomeViewChartTokens from './HomeViewChartTokens.vue';
import HomeViewPosterPrice from './HomeViewPosterPrice.vue';

export default {
  name: 'HomeViewContentTop',
  components: {
    HomeViewChartPrice,
    HomeViewChartTokens,
    HomeViewPosterPrice,
  },
};
</script>
