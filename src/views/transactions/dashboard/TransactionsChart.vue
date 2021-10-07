<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular color="primary" indeterminate size="100" />
      </div>
      <v-layout v-else fill-height data-test="content">
        <ChartComponent
          id="transactions-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import transactionsChartHelper from './helpers/transactionsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      isLoading: 'isLoading',
      transactions: 'transactions',
    }),
    chartData() {
      return transactionsChartHelper.getChartData(this.transactions);
    },
    chartLabel() {
      return transactionsChartHelper.getChartLabel(this.transactions);
    },
    chartOptions() {
      return transactionsChartHelper.getChartOptions();
    },
  },
};
</script>
