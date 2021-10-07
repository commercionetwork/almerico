<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <v-layout fill-height>
        <ChartComponent
          id="validator-details-chart"
          type="doughnut"
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

import validatorDetailsChartHelper from './helpers/validatorDetailsChartHelper';

export default {
  name: 'ValidatorDetailsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The account delegations',
    },
  },
  computed: {
    chartData() {
      return validatorDetailsChartHelper.getChartData(this.delegations);
    },
    chartLabel() {
      return validatorDetailsChartHelper.getChartLabel(this.delegations);
    },
    chartOptions() {
      return validatorDetailsChartHelper.getChartOptions();
    },
  },
};
</script>
