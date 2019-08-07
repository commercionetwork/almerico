<template>
  <HeaderCell :chart='true'>
    <div
      slot="header"
      v-text="$t('labels.bonded')"
    />
    <div
      slot="body"
      v-text="percent"
    />
    <div
      slot="footer"
      v-text="proportion"
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

import { mapGetters } from "vuex";

export default {
  name: "CellBonded",
  description: "Display the bonded",
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
    ...mapGetters("stake", {
      pool: "pool"
    }),
    axesColor() {
      return this.$theme.theme_light === "true" ? "#303030" : "#FFF";
    },
    lineColor() {
      return this.$theme.primary;
    },
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    notBonded() {
      return this.pool ? parseFloat(this.pool.not_bonded_tokens) : 0;
    },
    totalToken() {
      return this.bonded + this.notBonded;
    },
    percent() {
      return this.$n(this.percentValue, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    percentValue() {
      return this.bonded && this.totalToken ? this.bonded / this.totalToken : 0;
    },
    proportion() {
      let bonded = (this.bonded / 1000000000).toFixed(0);
      let total = (this.totalToken / 1000000000).toFixed(0);
      return `${bonded}M/${total}M`;
    }
  },
  watch: {
    percentValue() {
      this.setChartData();
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
                y: this.percentValue * 100
              },
              {
                x: 8,
                y: this.percentValue * 100
              },
              {
                x: 16,
                y: this.percentValue * 100
              },
              {
                x: 24,
                y: this.percentValue * 100
              }
            ],
            backgroundColor: 'rgba(0, 0, 0, 0)',
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
                display: false,
                color: this.axesColor
              },
              ticks: {
                max: 24,
                min: 0,
                fontSize: 9,
                fontColor: this.axesColor
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: this.axesColor
              },
              ticks: {
                fontSize: 9,
                fontColor: this.axesColor
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
