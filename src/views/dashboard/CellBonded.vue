<template>
  <DataCell :isFetching="isFetching">
    <div
      slot="top-left-content"
      class="com-font-s13-w400"
    >Bonded</div>
    <div slot="bottom-left-content">
      <div
        class="text-secondary com-font-s14-w700"
        v-text="percent"
      />
      <div
        class="text-secondary com-font-s11-w400"
        v-text="proportion"
      />
    </div>
    <div slot="top-right-content">
      <LineChart
        :chartdata="chartdata"
        :options="options"
        height="60"
        width="90"
        class="p-1"
      />
    </div>
    <div slot="bottom-right-content">
      <Icon
        name="arrowAltDown"
        class="text-danger"
        scale="0.75"
      />
      <span class="pl-1 com-font-s11-w400">-1,11% (24h)</span>
    </div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";
import LineChart from "Components/common/LineChart.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/arrow-alt-down";

import { mapGetters } from "vuex";

export default {
  name: "CellBonded",
  description: "Display the bonded",
  components: {
    DataCell,
    LineChart,
    Icon
  },
  data() {
    return {
      chartdata: {
        datasets: [
          {
            data: [
              {
                x: 0,
                y: 1
              },
              {
                x: 8,
                y: 1
              },
              {
                x: 16,
                y: 1
              },
              {
                x: 24,
                y: 1
              }
            ],
            backgroundColor: "#38BA8C",
            borderColor: "#237659",
            borderWidth: 1
          }
        ]
      },
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
      pool: "pool",
      isFetching: "isFetching"
    }),
    bonded() {
      return this.pool ? new Number(this.pool.bonded_tokens) : 0;
    },
    notBonded() {
      return this.pool ? new Number(this.pool.not_bonded_tokens) : 0;
    },
    percent() {
      return this.$n(this.bonded / this.notBonded, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    proportion() {
      return `${this.bonded / 1000000000}M/${this.notBonded / 1000000000}M`;
    }
  }
};
</script>
