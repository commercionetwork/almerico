<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <v-layout align-center justify-center column fill-height>
        <DoughnutChartComponent
          :chartData="chartData"
          :options="options"
          height="150"
          width="150"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import DoughnutChartComponent from '@/components/DoughnutChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import dashboardChartBuilder from './helpers/dashboardChartBuilder';
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardChart',
  components: {
    DoughnutChartComponent,
    TopBodyCardComponent,
  },
  data: () => ({
    allData: null,
  }),
  computed: {
    ...mapGetters('spreadsheet', {
      abrTokens: 'abrTokens',
      vbrTokens: 'vbrTokens',
    }),
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
      tokens: 'tokens',
    }),
    caption() {
      return this.allData ? `Total ${this.allData.all.label} COM` : '';
    },
    chartData() {
      return this.allData
        ? {
            labels: [
              `Bonded ${this.allData.bonded.percent}`,
              `Not Bonded ${this.allData.unbonded.percent}`,
              `Unrelease rewards ${this.allData.unreleasedRewards.percent}`,
              `Burned ${this.allData.burned.percent}`,
            ],
            datasets: [
              {
                data: [
                  this.allData.bonded.decimal,
                  this.allData.unbonded.decimal,
                  this.allData.unreleasedRewards.decimal,
                  this.allData.burned.decimal,
                ],
                backgroundColor: [
                  'rgb(47, 157, 119)',
                  'rgb(238, 51, 0)',
                  'rgb(255, 102, 0)',
                  'rgb(0, 0, 0)',
                ],
                borderColor: [
                  'rgb(235, 249, 244)',
                  'rgb(255, 235, 230)',
                  'rgb(255, 240, 230)',
                  'rgb(242, 242, 242)',
                ],
              },
            ],
          }
        : {};
    },
    options() {
      return {
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          bodyFontSize: 10,
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']];
            },
          },
        },
      };
    },
  },
  created() {
    dashboardChartBuilder
      .build({
        abrTokens: this.abrTokens,
        params: this.params,
        pool: this.pool,
        tokens: this.tokens,
        vbrTokens: this.vbrTokens,
      })
      .then((data) => (this.allData = data));
  },
};
</script>
