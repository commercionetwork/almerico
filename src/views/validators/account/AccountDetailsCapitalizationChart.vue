<template>
  <ChartContainerComponent :title="chartLabel">
    <template v-slot:chart>
      <ChartComponent
        id="account-details-capitalization-chart"
        type="bar"
        height="240"
        :dataset="chartData"
        :options="chartOptions"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import ChartContainerComponent from '@/components/chart/ChartContainerComponent';

import accountCapitalizationChartHelper from './helpers/accountCapitalizationChartHelper';

export default {
  name: 'AccountDetailsCapitalizationChart',
  props: {
    capitalization: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    ChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return accountCapitalizationChartHelper.getChartData(this.capitalization);
    },
    chartLabel() {
      return accountCapitalizationChartHelper.getChartLabel(
        this.capitalization,
      );
    },
    chartOptions() {
      return accountCapitalizationChartHelper.getChartOptions();
    },
  },
};
</script>
