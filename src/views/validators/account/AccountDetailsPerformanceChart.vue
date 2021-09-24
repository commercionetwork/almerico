<template>
  <v-card outlined>
    <v-card-title
      class="justify-center text-center text-truncate text-overline font-weight-bold"
      v-html="'tokens performance'"
    />
    <v-spacer />
    <v-card-text>
      <ChartComponent
        id="account-details-performance-chart"
        type="doughnut"
        height="150"
        widht="150"
        :data="chartData"
        :options="options"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';

export default {
  name: 'AccountDetailsPerformanceChart',
  props: {
    assets: {
      type: Object,
      required: true,
      note: 'The balance amounts to display',
    },
  },
  components: {
    ChartComponent,
  },
  computed: {
    chartData() {
      return {
        labels: [`Earning Rewards`, `Not Earning Rewards`],
        datasets: [
          {
            data: [this.earningRewards, this.notEarningRewards],
            backgroundColor: ['rgb(47, 157, 119)', 'rgb(211, 47, 47)'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const value = `${
                data['datasets'][0]['data'][tooltipItem['index']]
              }%`;
              const label = data['labels'][tooltipItem['index']];
              return [value, label];
            },
          },
        },
      };
    },
    earningRewards() {
      return this.formatPercent(this.assets.earning, this.assets.total);
    },
    notEarningRewards() {
      return this.formatPercent(this.assets.notEarning, this.assets.total);
    },
  },
  methods: {
    formatPercent(amount, total) {
      return ((amount / total) * 100).toFixed(2);
    },
  },
};
</script>
