<template>
  <v-card outlined class="d-flex fill-height flex-column">
    <v-card-title
      class="
        justify-center
        text-center text-truncate text-overline
        font-weight-bold
      "
      v-text="chartLabel"
    />
    <v-card-text>
      <ChartComponent
        id="validator-details-chart"
        height="175"
        type="pie"
        :dataset="chartData"
        :options="chartOptions"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';

import validatorsDetailChartHelper from './helpers/validatorsDetailChartHelper';

export default {
  name: 'ValidatorsDetailChartComponent',
  components: { ChartComponent },
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
