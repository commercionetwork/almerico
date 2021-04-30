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

import { mapGetters } from 'vuex';
import { TokensHandler } from '@/utils';

export default {
  name: 'DashboardChart',
  components: {
    DoughnutChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
      tokens: 'tokens',
    }),
    allData() {
      const tokensHandler = new TokensHandler({
        params: this.params,
        tokens: this.tokens,
        pool: this.pool,
      });
      return tokensHandler.build();
    },
    caption() {
      return `Total ${this.allData.million.total}`;
    },
    chartData() {
      return {
        labels: [
          `Bonded ${this.allData.percent.bonded}`,
          `Not Bonded ${this.allData.percent.unbonded}`,
        ],
        datasets: [
          {
            data: [this.allData.amount.bonded, this.allData.amount.unbonded],
            backgroundColor: ['rgb(47, 157, 119)', 'rgb(230, 46, 0)'],
            borderColor: ['rgb(235, 249, 244)', 'rgb(255, 235, 230)'],
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
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']];
            },
          },
        },
      };
    },
  },
};
</script>
