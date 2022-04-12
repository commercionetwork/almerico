<template>
  <BaseTopContentCard :loading="isLoadingParams" :title="$t('titles.trend')">
    <template #content>
      <div
        class="py-3 fill-height flex-column d-flex justify-center align-center"
      >
        <BaseChart
          id="dashboard-price-chart"
          type="line"
          :dataset="chartData"
          :options="chartOptions"
        />
        <HomeViewChartPriceRange @range-changed="chartRangeChange" />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseChart from '@/components/chart/BaseChart';
import HomeViewChartPriceRange from './HomeViewChartPriceRange';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { HOME } from '@/constants';
import { mapGetters } from 'vuex';
import priceChartHelper from './helpers/priceChartHelper';

export default {
  name: 'HomeViewChartPrice',
  components: {
    BaseChart,
    HomeViewChartPriceRange,
    BaseTopContentCard,
  },
  data: () => ({
    range: HOME.RANGE.MONTH,
  }),
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
