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
  name: "VotingDetailsVoteChart",
  description: "Display a voting's chart",
  components: {
    DoughnutChart
  },
  props: {
    abstain: {
      type: Number,
      default: 0,
      note: "Abstain vote stack"
    },
    no: {
      type: Number,
      default: 0,
      note: "No vote stack"
    },
    noWithVeto: {
      type: Number,
      default: 0,
      note: "No with veto vote stack"
    },
    yes: {
      type: Number,
      default: 0,
      note: "Yes vote stack"
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
    },
    total() {
      return this.abstain + this.no + this.noWithVeto + this.yes;
    }
  },
  methods: {
    getPercent(value) {
      return this.total > 0 ? ((value / this.total) * 100).toFixed(2) : 0;
    },
    setChartData() {
      let data = [
        this.getPercent(this.yes),
        this.getPercent(this.abstain),
        this.getPercent(this.no),
        this.getPercent(this.noWithVeto)
      ];
      this.chartdata = {
        labels: [
          this.$t("labels.yes"),
          this.$t("labels.abstain"),
          this.$t("labels.no"),
          this.$t("labels.noWithVeto")
        ],
        datasets: [
          {
            data,
            backgroundColor: [
              this.$theme.success,
              this.$theme.info,
              this.$theme.warning,
              this.$theme.danger
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