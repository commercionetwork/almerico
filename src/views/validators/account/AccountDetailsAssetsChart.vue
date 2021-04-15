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

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'AccountDetailsAssetsChart',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    DoughnutChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    chartData() {
      return {
        labels: [
          this.formatPercent('Active', this.assets.active, this.assets.total),
          this.formatPercent(
            'Passive',
            this.assets.passive,
            this.assets.total,
          ),
        ],
        datasets: [
          {
            data: [
              this.assets.active ,
              this.assets.passive,
            ],
            backgroundColor: ['#009900', '#cc0000'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: false,
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
    caption() {
      return `Assets`;
    },
  },
  methods: {
    formatPercent(label, amount, total) {
      const percent = ((amount / total) * 100).toFixed(2);
      return `${label} ${percent}%`;
    },
    formatTokens(value) {
      return numberIntlFormatter.toDecimal({
        amount: value / 1000000,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
    },
  },
};
</script>
