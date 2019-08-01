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
  name: "ValidatorDetailsDelegatedChart",
  description: "Display the chart of validator's delegations",
  components: {
    DoughnutChart
  },
  props: {
    others: {
      type: Number,
      default: 0,
      note: "Total token delegated from others"
    },
    self: {
      type: Number,
      default: 0,
      note: "Total token self delegated"
    },
    totals: {
      type: Number,
      default: 0,
      note: "Total tokens"
    }
  },
  data() {
    return {
      chartdata: null,
      options: null
    };
  },
  computed: {
    legendColor() {
      return this.$theme.theme_light === "true" ? "#303030" : "#FFF";
    }
  },
  methods: {
    getPercent(value, total) {
      return total > 0 ? ((value / total) * 100).toFixed(2) : 0;
    },
    setChartData() {
      let data = [
        this.getPercent(this.others, this.totals),
        this.getPercent(this.self, this.totals)
      ];
      this.chartdata = {
        labels: [this.$t("labels.others"), this.$t("labels.self")],
        datasets: [
          {
            data,
            backgroundColor: [
              this.$theme.success,
              this.$theme.info
            ]
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "left",
          labels: {
            fontColor: this.legendColor,
            fontSize: 13
          }
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
      };
    }
  },
  mounted() {
    this.setChartData();
  }
};
</script>
