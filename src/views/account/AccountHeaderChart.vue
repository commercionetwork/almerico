<template>
  <DoughnutChart
    :chartdata="chartdata"
    :options="options"
    height="120"
    width="120"
  />
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

export default {
  name: "AccountHeaderChart",
  description: "Display the account chart",
  components: {
    DoughnutChart
  },
  props: {
    availables: { type: Number, default: 0, note: "Total token availables" },
    delegated: { type: Number, default: 0, note: "Total token delegated" },
    rewards: { type: Number, default: 0, note: "Total token rewards" },
    unbonded: { type: Number, default: 0, note: "Total token unbonded" },
    totals: { type: Number, default: 0, note: "Total tokens" }
  },
  data() {
    return {
      labels: [
        this.$t("labels.availables"),
        this.$t("labels.delegated"),
        this.$t("labels.unbonded"),
        this.$t("labels.rewards")
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "left"
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                data["labels"][tooltipItem["index"]] +
                ": " +
                data["datasets"][0]["data"][tooltipItem["index"]] +
                "%"
              );
            }
          }
        }
      }
    };
  },
  computed: {
    chartdata() {
      let data = [
        this.getPercent(this.availables, this.totals),
        this.getPercent(this.delegated, this.totals),
        this.getPercent(this.unbonded, this.totals),
        this.getPercent(this.rewards, this.totals)
      ];
      return {
        labels: this.labels,
        datasets: [
          {
            data,
            backgroundColor: ["#33cc99", "#3399ff", "#ffcc00", "#cc3333"]
          }
        ]
      };
    }
  },
  methods: {
    getPercent(value, total) {
      return total > 0 ? ((value / total) * 100).toFixed(2) : 0;
    }
  }
};
</script>
