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
      options: null
    };
  },
  computed: {
    axesColor() {
      return this.$theme.theme_light === "true"
        ? "rgba(20, 20, 20, 0.2)"
        : "rgba(255, 255, 255, 0.4)";
    },
    axesZeroColor() {
      return this.$theme.theme_light === "true" ? "#303030" : "#FFF";
    },
    lineColor() {
      return this.$theme.primary;
    },
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
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: this.lineColor,
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0)",
                zeroLineColor: this.axesZeroColor
              },
              ticks: {
                max: 24,
                min: 0,
                fontSize: 9,
                fontColor: this.axesZeroColor
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: this.axesColor,
                zeroLineColor: this.axesZeroColor
              },
              ticks: {
                fontSize: 9,
                fontColor: this.axesZeroColor
              }
            }
          ]
        }
      };
    }
  },
  mounted() {
    this.setChartData();
  }
};
</script>
