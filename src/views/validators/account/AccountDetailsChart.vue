<template>
  <v-layout align-center justify-center column fill-height>
    <span class="text-caption font-weight-medium" v-text="caption" />
    <DoughnutChart
      :chartData="chartData"
      :options="options"
      height="150"
      width="150"
    />
  </v-layout>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart";

export default {
  name: "AccountDetailsChart",
  props: {
    amounts: {
      type: Object,
      required: true,
      note: "The amounts to display",
    },
  },
  components: {
    DoughnutChart,
  },
  computed: {
    chartData() {
      return {
        labels: [
          `Availables ${this.availables}`,
          `Delegations ${this.delegations}`,
          `Unbondings ${this.unbondings}`,
          `Rewards ${this.rewards}`,
        ],
        datasets: [
          {
            data: [
              this.availables,
              this.delegations,
              this.unbondings,
              this.rewards,
            ],
            backgroundColor: ["#689F38", "#FFA000", "#0288D1", "#D32F2F"],
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
            label: function (tooltipItem, data) {
              return data["labels"][tooltipItem["index"]];
            },
          },
        },
      };
    },
    caption() {
      return `Total ${this.formatTokens(this.amounts["total"])}`;
    },
    availables() {
      return this.formatTokens(this.amounts["availables"]);
    },
    delegations() {
      return this.formatTokens(this.amounts["delegations"]);
    },
    unbondings() {
      return this.formatTokens(this.amounts["unbondings"]);
    },
    rewards() {
      return this.formatTokens(this.amounts["rewards"]);
    },
  },
  methods: {
    formatTokens(value) {
      return Math.round(value / 1000000);
    },
  },
};
</script>