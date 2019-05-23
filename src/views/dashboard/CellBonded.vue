<template>
  <DataCell :isFetching="isFetching">
    <div
      slot="top-left-content"
      class="com-font-s12-w400"
    >Bonded</div>
    <div slot="top-right-content">
      <LineChart
        :chartdata="chartdata"
        :options="options"
        class="p-1"
      />
    </div>
    <div slot="bottom-left-content">
      <span class="text-secondary com-font-s13-w700">54,5%</span><br>
      <span class="text-secondary com-font-s11-w400">120M/240M</span>
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
                y: 55
              },
              {
                x: 8,
                y: 53
              },
              {
                x: 16,
                y: 54
              },
              {
                x: 24,
                y: 54.5
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
    isFetching() {
      return false;
    }
  }
};
</script>
