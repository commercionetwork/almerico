<template>
  <base-top-content-card :loading="isLoadingParams" :title="$t('titles.trend')">
    <template #content>
      <div
        class="py-3 fill-height flex-column d-flex justify-center align-center"
      >
        <base-chart
          :id="CHARTS.ID.DASHBOARD_PRICE"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.LINE"
        />
        <home-view-chart-price-range @range-changed="chartRangeChange" />
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import HomeViewChartPriceRange from './HomeViewChartPriceRange';

import priceChartHelper from './helpers/priceChartHelper';
import { CHARTS, HOME } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeViewChartPrice',
  components: { HomeViewChartPriceRange },
  data() {
    return {
      CHARTS,
      range: HOME.RANGE.MONTH,
    };
  },
  computed: {
    ...mapGetters('home', ['isLoadingParams', 'paramsUpdates', 'startingDate']),
    chartData() {
      return priceChartHelper.getChartData({
        firstDate: this.startingDate,
        paramsUpdates: this.paramsUpdates,
        range: this.range,
      });
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
