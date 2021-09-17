<template>
  <TopBodyCardComponent title="trend">
    <template v-slot:content>
      <span v-if="isLoading" data-test="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          size="50"
          widht="10"
        />
      </span>
      <span v-else-if="error" data-test="error">
        <v-alert border="left" prominent text type="error">
          <span class="text-body-1" v-text="errorMessage" />
        </v-alert>
      </span>
      <span v-else data-test="content">
        <v-layout align-center justify-center column fill-height>
          <LineChartComponent :chartData="chartData" :options="options" />
          <DashboardPriceChartRange v-on:range-changed="chartRangeChange" />
        </v-layout>
      </span>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import DashboardPriceChartRange from './DashboardPriceChartRange.vue';
import LineChartComponent from '@/components/LineChartComponent.vue';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';
import { RANGE } from '@/constants';
import { dateHandler, PriceHandler } from '@/utils';

export default {
  name: 'DashboardPriceChart',
  components: {
    DashboardPriceChartRange,
    LineChartComponent,
    TopBodyCardComponent,
  },
  data: () => ({
    range: RANGE.MONTH,
  }),
  computed: {
    ...mapGetters('dashboard', {
      error: 'error',
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
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      };
    },
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : 'We are sorry but there was an error';
    },
    firstRate() {
      return {
        rate: '1.000000000000000000',
        date: this.startingDate,
      };
    },
    priceMutations() {
      return new PriceHandler(
        this.firstRate,
        this.rateUpdates,
        this.range,
      ).getListingsByRange();
    },
  },
  methods: {
    chartRangeChange(range) {
      this.range = range;
    },
  },
};
</script>
