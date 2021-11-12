<template>
  <TopContentCardComponent :title="chartLabel">
    <template v-slot:content>
      <v-layout class="fill-height">
        <ChartComponent
          id="validator-details-chart"
          type="pie"
          :dataset="chartData"
          :options="chartOptions"
        />
      </v-layout>
    </template>
  </TopContentCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import validatorsDetailChartHelper from './helpers/validatorsDetailChartHelper';

export default {
  name: 'ValidatorsDetailChartComponent',
  components: {
    ChartComponent,
    TopContentCardComponent,
  },
  props: {
    delegations: {
      type: Object,
      required: true,
      note: 'The data to draw chart',
    },
  },
  computed: {
    chartData() {
      return validatorsDetailChartHelper.getChartData(this.delegations, {
        others: this.$t('labels.others'),
        self: this.$t('labels.self'),
      });
    },
    chartLabel() {
      return validatorsDetailChartHelper.getChartLabel(
        this.delegations,
        this.$t('labels.delegated'),
      );
    },
    chartOptions() {
      return validatorsDetailChartHelper.getChartOptions();
    },
  },
};
</script>
