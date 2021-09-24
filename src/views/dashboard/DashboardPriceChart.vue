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
          :options="options"
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
import { dateHandler } from '@/utils';
import priceHandler from './priceHandler';

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
      return {
        labels: this.priceMutations.map((update) =>
          dateHandler.getFormattedDate(update.date),
        ),
        datasets: [
          {
            data: this.priceMutations.map((update) => update.price.toFixed(2)),
            fill: true,
            backgroundColor: 'rgba(179, 224, 255, 0.5)',
            borderColor: 'rgb(77, 184, 255)',
            pointBackgroundColor: 'rgb(0, 138, 230)',
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        tension: 0.1,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const index = tooltipItem.dataIndex;
                return `${tooltipItem.dataset.data[index]}`;
              },
            },
          },
        },
      };
    },
    firstRate() {
      return {
        rate: '1.000000000000000000',
        date: this.startingDate,
      };
    },
    priceMutations() {
      return priceHandler.getListingsByRange({
        firstRate: this.firstRate,
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
