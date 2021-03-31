<template>
  <v-layout align-center justify-center column fill-height>
    <span class="text-caption font-weight-medium" v-text="caption" />
    <DoughnutChartComponent
      :chartData="chartData"
      :options="options"
      height="150"
      width="150"
    />
  </v-layout>
</template>

<script>
import DoughnutChartComponent from "@/components/DoughnutChartComponent";

import { mapGetters } from "vuex";

export default {
  name: "ValidatorsChart",
  components: {
    DoughnutChartComponent,
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators",
    }),
    chartData() {
      return {
        labels: [
          `${this.validatorsBondeds} Bonded`,
          `${this.validatorsNotBondeds} Not Bonded`,
        ],
        datasets: [
          {
            data: [this.validatorsBondeds, this.validatorsNotBondeds],
            backgroundColor: ["#303F9F", "#5C6BC0"],
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
      return this.validators.length > 0
        ? `Validators: ${this.validators.length}`
        : "Validators";
    },
    validatorsBondeds() {
      return this.validators.filter((validator) => validator.status === 2)
        .length;
    },
    validatorsNotBondeds() {
      return this.validators.filter((validator) => validator.status !== 2)
        .length;
    },
  },
};
</script>