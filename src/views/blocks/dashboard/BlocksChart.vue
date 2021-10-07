<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular color="primary" indeterminate size="100" />
      </div>
      <v-layout v-else fill-height data-test="content">
        <ChartComponent
          id="blocks-chart"
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

import blocksChartHelper from './helpers/blocksChartHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'BlocksChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('blocks', {
      isLoading: 'isLoading',
      blocks: 'blocks',
    }),
    chartData() {
      return blocksChartHelper.getChartData(this.blocks);
    },
    chartLabel() {
      return blocksChartHelper.getChartLabel(this.blocks);
    },
    chartOptions() {
      return blocksChartHelper.getChartOptions();
    },
  },
};
</script>
