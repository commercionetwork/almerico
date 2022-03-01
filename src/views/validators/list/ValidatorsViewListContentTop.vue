<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewListChart />
    </v-col>
    <v-col cols="12" md="4">
      <ValidatorsViewListSearch />
    </v-col>
  </v-row>
</template>

<script>
import TheLatestHeight from '@/components/TheLatestHeight';
import ValidatorsViewListChart from './ValidatorsViewListChart.vue';
import ValidatorsViewListSearch from './ValidatorsViewListSearch.vue';

export default {
  name: 'ValidatorsViewListContentTop',
  components: {
    TheLatestHeight,
    ValidatorsViewListChart,
    ValidatorsViewListSearch,
  },
};
</script>
