<template>
  <v-row>
    <v-col cols="12" md="4">
      <LatestHeightComponent />
    </v-col>
    <v-col cols="12" md="4">
      <TransactionsListChartComponent />
    </v-col>
    <v-col cols="12" md="4">
      <TransactionsListSearchComponent />
    </v-col>
  </v-row>
</template>

<script>
import LatestHeightComponent from '@/components/LatestHeightComponent';
import TransactionsListChartComponent from './TransactionsListChartComponent.vue';
import TransactionsListSearchComponent from './TransactionsListSearchComponent.vue';

export default {
  name: 'TransactionsListTopContentComponent',
  components: {
    LatestHeightComponent,
    TransactionsListChartComponent,
    TransactionsListSearchComponent,
  },
};
</script>
