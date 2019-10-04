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
    <div slot="footer">
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else
        v-text="proportion"
        data-test="items"
      />
    </div>
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

import { API_VERSION } from "Constants";
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
      pool: "pool",
      isFetchingPool: "isFetching"
    }),
    ...mapGetters("tendermint", {
      genesis: "genesis",
      isFetchingGenesis: "isFetching"
    }),
    axesColor() {
      return this.$theme.theme_light === "true" ? "#303030" : "#FFF";
    },
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    isFetching() {
      return this.isFetchingPool || this.isFetchingGenesis;
    },
    lineColor() {
      return this.$theme.primary;
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
      return total > 0 ? `${bonded}M/${total}M` : "-";
    },
    totalToken() {
      let tot = 0;
      const accounts = this.genesis
        ? this.genesis.genesis.app_state.accounts
        : [];
      if (accounts.length > 0) {
        accounts.forEach(account => {
          tot += parseFloat(account.coins[0].amount);
        });
      }
      return tot;
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
