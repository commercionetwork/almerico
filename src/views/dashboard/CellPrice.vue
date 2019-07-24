<template>
  <HeaderCell :chart='true'>
    <div
      slot="header"
      v-text="$t('labels.price')"
    />
    <div
      slot="body"
      v-text="'1,00 €'"
    />
    <div
      slot="footer"
      v-text="'0% (24h)'"
    />
    <div slot="chart">
      <LineChart
        :chartdata="chartdata"
        :options="options"
      />
    </div>
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";
import LineChart from "Components/common/LineChart.vue";

export default {
  name: "CellPrice",
  description: "Display the price",
  components: {
    HeaderCell,
    LineChart
  },
  data() {
    return {
      chartdata: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              ticks: {
                max: 24,
                min: 0,
                fontSize: 8
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 8
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    price() {
      return 1;
    }
  },
  methods: {
    setChartData() {
      this.chartdata = {
        datasets: [
          {
            data: [
              {
                x: 0,
                y: this.price
              },
              {
                x: 8,
                y: this.price
              },
              {
                x: 16,
                y: this.price
              },
              {
                x: 24,
                y: this.price
              }
            ],
            backgroundColor: "#38BA8C",
            borderColor: "#237659",
            borderWidth: 1
          }
        ]
      };
    }
  },
  mounted() {
    this.setChartData();
  }
};
</script>
