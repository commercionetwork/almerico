<template>
  <HeaderCell :chart='true'>
    <div
      slot="header"
      v-text="'Bonded'"
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
    ...mapGetters("stake", {
      pool: "pool"
    }),
    bonded() {
      return this.pool ? new Number(this.pool.bonded_tokens) : 0;
    },
    notBonded() {
      return this.pool ? new Number(this.pool.not_bonded_tokens) : 0;
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
      return `${this.bonded / 1000000000}M/${this.totalToken / 1000000000}M`;
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
