<template>
  <ChartContainerComponent title="tokens performance">
    <template v-slot:chart>
      <DoughnutChartComponent
        :chartData="chartData"
        :options="options"
        height="150"
        width="150"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import DoughnutChartComponent from '@/components/DoughnutChartComponent';
import ChartContainerComponent from '@/components/ChartContainerComponent.vue';

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
    DoughnutChartComponent,
    ChartContainerComponent,
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
        legend: {
          display: false,
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
