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
          <LineChartComponent
            :chartData="chartData"
            :options="options"
            height="150"
            width="200"
          />
        </v-layout>
      </span>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import LineChartComponent from '@/components/LineChartComponent.vue';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';
import { PriceHandler } from '@/utils';

export default {
  name: 'DashboardPriceChart',
  components: {
    LineChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('dashboard', {
      error: 'error',
      isLoading: 'isLoading',
      rateUpdates: 'rateUpdates',
      startingDate: 'startingDate',
    }),
    chartData() {
      return {
        labels: this.priceMutations.map((update) => update.date),
        datasets: [
          {
            data: this.priceMutations.map((update) => update.price),
            backgroundColor: '#b3e0ff',
            borderColor: '#4db8ff',
            pointBackgroundColor: '#008ae6',
            lineTension: 0.5,
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        legend: {
          display: false,
        },
      };
    },
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
    priceMutations() {
      return new PriceHandler(this.rateUpdates, this.startingDate).getMutations();
    },
  },
};
</script>
