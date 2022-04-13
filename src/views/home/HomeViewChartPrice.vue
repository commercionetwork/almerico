<template>
  <BaseTopContentCard :loading="isLoadingParams" :title="$t('titles.trend')">
    <template #content>
      <div
        class="py-3 fill-height flex-column d-flex justify-center align-center"
      >
        <BaseChart
          :id="CHARTS.ID.DASHBOARD_PRICE"
          :dataset="chartData"
          :options="chartOptions"
          :type="CHARTS.TYPE.LINE"
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

import priceChartHelper from './helpers/priceChartHelper';
import { CHARTS, HOME } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeViewChartPrice',
  components: {
    BaseChart,
    HomeViewChartPriceRange,
    BaseTopContentCard,
  },
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
