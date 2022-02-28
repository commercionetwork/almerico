<template>
  <v-row>
    <v-col cols="12" md="6" xl="3">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomeViewPosterPrice />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomeViewChartPrice />
    </v-col>
    <v-col cols="12" md="6" xl="3">
      <HomeViewChartTokens />
    </v-col>
  </v-row>
</template>

<script>
import HomeViewChartPrice from './HomeViewChartPrice.vue';
import HomeViewPosterPrice from './HomeViewPosterPrice.vue';
import HomeViewChartTokens from './HomeViewChartTokens.vue';
import TheLatestHeight from '@/components/TheLatestHeight';

export default {
  name: 'HomeViewContentTop',
  components: {
    HomeViewChartPrice,
    HomeViewPosterPrice,
    HomeViewChartTokens,
    TheLatestHeight,
  },
};
</script>
