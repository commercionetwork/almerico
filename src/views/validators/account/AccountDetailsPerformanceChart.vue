<template>
  <ChartContainerComponent title="tokens performance">
    <template v-slot:chart>
      <BarChartComponent :chartData="chartData" :options="options" />
    </template>
  </ChartContainerComponent>
</template>

<script>
import BarChartComponent from '@/components/BarChartComponent';
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
    BarChartComponent,
    ChartContainerComponent,
  },
  computed: {
    chartData() {
      return {
        labels: ['Earning', 'Not Earning'],
        datasets: [
          {
            data: [
              this.formatPercent(this.assets.earning, this.assets.total),
              this.formatPercent(this.assets.notEarning, this.assets.total),
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 100,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function(ctx, data) {
              return `${data['datasets'][0]['data'][ctx['index']]}%`;
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
