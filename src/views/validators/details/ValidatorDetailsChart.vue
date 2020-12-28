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
  name: "ValidatorDetailsChart",
  components: {
    DoughnutChart,
  },
  props: {
    delegations: {
      type: Object,
      required: true,
      note: "The account delegations",
    },
  },
  computed: {
    chartData() {
      return {
        labels: [`Others ${this.others}`, `Self ${this.self}`],
        datasets: [
          {
            data: [this.others, this.self],
            backgroundColor: ["#42A5F5", "#1976D2"],
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
      return this.total ? `${this.total} Delegated` : "-";
    },
    others() {
      return this.formatTokens(this.delegations["others"]);
    },
    self() {
      return this.formatTokens(this.delegations["self"]);
    },
    total() {
      return this.formatTokens(this.delegations["total"]);
    },
  },
  methods: {
    formatTokens(value) {
      const options = {
        style: "decimal",
        maximumFractionDigits: 0,
      };
      return new Intl.NumberFormat(undefined, options).format(value / 1000000);
    },
  },
};
</script>