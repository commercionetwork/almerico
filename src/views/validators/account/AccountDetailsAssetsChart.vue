<template>
  <ChartContainerComponent>
    <template v-slot:chart>
      <BarChartComponent
        :chartData="chartData"
        :options="options"
        height="200"
        width="300"
      />
    </template>
  </ChartContainerComponent>
</template>

<script>
import BarChartComponent from '@/components/BarChartComponent';
import ChartContainerComponent from '@/components/ChartContainerComponent.vue';

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
    BarChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return {
        labels: ['Performing', 'Unused'],
        datasets: [
          {
            data: [
              this.formatPercent(this.assets.performing, this.assets.total),
              this.formatPercent(this.assets.unused, this.assets.total),
            ],
            backgroundColor: [
              'rgba(56, 186, 140, 0.33)',
              'rgba(204, 0, 0, 0.33)',
            ],
            borderColor: ['rgb(56, 186, 140)', 'rgb(204, 0, 0)'],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Assets',
        },
        legend: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return `${data['datasets'][0]['data'][tooltipItem['index']]}%`;
            },
          },
        },
      };
    },
  },
  methods: {
    formatPercent(amount, total) {
      return ((amount / total) * 100).toFixed(2);
    },
  },
};
</script>
