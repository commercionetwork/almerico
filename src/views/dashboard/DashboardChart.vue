<template>
  <DashboardCard :title="caption">
    <template v-slot:content>
      <v-layout align-center justify-center column fill-height>
        <DoughnutChart
          :chartData="chartData"
          :options="options"
          height="150"
          width="150"
        />
      </v-layout>
    </template>
  </DashboardCard>
</template>

<script>
import DashboardCard from "@/components/DashboardCard.vue";
import DoughnutChart from "@/components/DoughnutChart";

import { mapGetters } from "vuex";
import { numberIntlFormatter } from "@/utils";

export default {
  name: "DashboardChart",
  components: {
    DashboardCard,
    DoughnutChart
  },
  computed: {
    ...mapGetters("starting", {
      pool: "pool"
    }),
    chartData() {
      return {
        labels: [
          `Bonded ${this.tokenBonded}`,
          `Not Bonded ${this.tokenNotBonded}`
        ],
        datasets: [
          {
            data: [this.pool.bonded_tokens, this.pool.not_bonded_tokens],
            backgroundColor: ["#2F9D77", "#4ECA9F"]
          }
        ]
      };
    },
    options() {
      return {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data["labels"][tooltipItem["index"]];
            }
          }
        }
      };
    },
    caption() {
      return this.pool
        ? `Pool: ${this.formatTokens(
            parseInt(this.pool.bonded_tokens) +
              parseInt(this.pool.not_bonded_tokens)
          )}`
        : "Pool";
    },
    tokenBonded() {
      return this.pool
        ? this.formatTokens(parseInt(this.pool.bonded_tokens))
        : "-";
    },
    tokenNotBonded() {
      return this.pool
        ? this.formatTokens(parseInt(this.pool.not_bonded_tokens))
        : "-";
    }
  },
  methods: {
    formatTokens(value) {
      return `${numberIntlFormatter.toDecimal({
        amount: value / 1000000,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      })} M`;
    }
  }
};
</script>
