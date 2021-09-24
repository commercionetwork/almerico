<template>
  <TopBodyCardComponent :title="caption">
    <template v-slot:content>
      <v-layout fill-height>
        <ChartComponent
          id="validators-chart"
          type="doughnut"
          :data="chartData"
          :options="options"
        />
      </v-layout>
    </template>
  </TopBodyCardComponent>
</template>

<script>
import ChartComponent from '@/components/chart/ChartComponent';
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsChart',
  components: {
    ChartComponent,
    TopBodyCardComponent,
  },
  computed: {
    ...mapGetters('validators', {
      validators: 'validators',
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
            backgroundColor: ['#303F9F', '#5C6BC0'],
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data['labels'][tooltipItem['index']];
            },
          },
        },
      };
    },
    caption() {
      return this.validators.length > 0
        ? `Validators: ${this.validators.length}`
        : 'Validators';
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
