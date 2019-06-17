<template>
  <DataCell :isFetching="isFetching">
    <div
      slot="top-left-content"
      class="com-font-s13-w400"
    >Price</div>
    <div
      slot="bottom-left-content"
      class="text-secondary com-font-s14-w700"
    >1,00 €</div>
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
      <span class="pl-1 com-font-s11-w400">0% (24h)</span>
    </div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";
import LineChart from "Components/common/LineChart.vue";

export default {
  name: "CellPrice",
  description: "Display the price",
  components: {
    DataCell,
    LineChart
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
    isFetching() {
      return false;
    }
  }
};
</script>
