<template>
  <TopBodyCardComponent :title="chartLabel">
    <template v-slot:content>
      <div v-if="isLoading" data-test="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          size="50"
          widht="10"
        />
      </div>
      <v-layout
        class="pb-3"
        column
        justify-center
        fill-height
        v-else
        data-test="content"
      >
        <ChartComponent
          id="dashboard-price-chart"
          type="line"
          :dataset="chartData"
          :options="chartOptions"
        />
        <DashboardPriceChartRange v-on:range-changed="chartRangeChange" />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import DashboardPriceChartRange from './DashboardPriceChartRange.vue';
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';
import { RANGE } from '@/constants';
import priceChartHelper from './helpers/priceChartHelper';

export default {
  name: 'DashboardPriceChart',
  components: {
    DashboardPriceChartRange,
    ChartComponent,
    TopBodyCardComponent,
  },
  data: () => ({
    range: RANGE.MONTH,
  }),
  computed: {
    ...mapGetters('dashboard', {
      isLoading: 'isLoading',
      rateUpdates: 'rateUpdates',
      startingDate: 'startingDate',
    }),
    chartData() {
      return priceChartHelper.getChartData({
        startingDate: this.startingDate,
        rateUpdates: this.rateUpdates,
        range: this.range,
      });
    },
    chartLabel() {
      return priceChartHelper.getChartLabel();
    },
    chartOptions() {
      return priceChartHelper.getChartOptions();
    },
  },
  methods: {
    chartRangeChange(range) {
      this.range = range;
    },
  },
};
</script>
