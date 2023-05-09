<template>
  <v-row>
    <v-col cols="12" md="4">
      <the-latest-height />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-list-chart />
    </v-col>
    <v-col cols="12" md="4">
      <validators-view-list-search />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewListChart from './ValidatorsViewListChart.vue';
import ValidatorsViewListSearch from './ValidatorsViewListSearch.vue';

export default {
  name: 'ValidatorsViewListContentTop',
  components: {
    ValidatorsViewListChart,
    ValidatorsViewListSearch,
  },
};
</script>
