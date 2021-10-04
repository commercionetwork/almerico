<template>
  <TopBodyCardComponent title="trend">
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
          :options="CHART_OPTIONS"
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
import priceChartHelper, { CHART_OPTIONS } from './helpers/priceChartHelper';

export default {
  name: 'DashboardPriceChart',
  components: {
    DashboardPriceChartRange,
    ChartComponent,
    TopBodyCardComponent,
  },
  data: () => ({
    CHART_OPTIONS,
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
  },
  methods: {
    chartRangeChange(range) {
      this.range = range;
    },
  },
};
</script>
