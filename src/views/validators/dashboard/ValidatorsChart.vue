<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <v-layout fill-height>
        <ChartComponent
          id="validators-chart"
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

import validatorsChartHelper from './helpers/validatorsChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('validators', {
      validators: 'validators',
    }),
    chartData() {
      return validatorsChartHelper.getChartData(this.validators);
    },
    chartLabel() {
      return validatorsChartHelper.getChartLabel(this.validators);
    },
    chartOptions() {
      return validatorsChartHelper.getChartOptions();
    },
  },
};
</script>
