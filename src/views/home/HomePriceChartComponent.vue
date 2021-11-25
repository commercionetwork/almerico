<template>
  <TopContentCardComponent :title="$t('titles.trend')">
    <template v-slot:content>
      <div
        class="pb-3 fill-height flex-column d-flex justify-center align-center"
      >
        <ChartComponent
          id="dashboard-price-chart"
          type="line"
          :dataset="chartData"
          :options="chartOptions"
        />
        <HomePriceChartRangeComponent v-on:range-changed="chartRangeChange" />
      </div>
    </template>
  </TopContentCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import HomePriceChartRangeComponent from './HomePriceChartRangeComponent';
import TopContentCardComponent from '@/components/TopContentCardComponent.vue';

import { HOME } from '@/constants';
import { mapGetters } from 'vuex';
import priceChartHelper from './helpers/priceChartHelper';

export default {
  name: 'HomePriceChartComponent',
  components: {
    ChartComponent,
    HomePriceChartRangeComponent,
    TopContentCardComponent,
  },
  data: () => ({
    range: HOME.RANGE.MONTH,
  }),
  computed: {
    ...mapGetters('home', {
      rateUpdates: 'rateUpdates',
      startingDate: 'startingDate',
    }),
    chartData() {
      return priceChartHelper.getChartData({
        firstDate: this.startingDate,
        rateUpdates: this.rateUpdates,
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
