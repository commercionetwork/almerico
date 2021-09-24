<template>
  <ChartContainerComponent title="tokens performance">
    <template v-slot:chart>
      <ChartComponent
        id="account-details-performance-chart"
        type="doughnut"
        height="150"
        :data="chartData"
        :options="options"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import ChartContainerComponent from '@/components/chart/ChartContainerComponent';

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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const index = tooltipItem.dataIndex;
                return `${tooltipItem.label} ${tooltipItem.dataset.data[index]}%`;
              },
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
