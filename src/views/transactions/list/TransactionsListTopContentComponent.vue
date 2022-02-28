<template>
  <v-row>
    <v-col cols="12" md="4">
      <TheLatestHeight />
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
import TheLatestHeight from '@/components/TheLatestHeight';
import TransactionsListChartComponent from './TransactionsListChartComponent.vue';
import TransactionsListSearchComponent from './TransactionsListSearchComponent.vue';

export default {
  name: 'TransactionsListTopContentComponent',
  components: {
    TheLatestHeight,
    TransactionsListChartComponent,
    TransactionsListSearchComponent,
  },
};
</script>
