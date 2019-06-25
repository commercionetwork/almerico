<template>
  <div class="row p-1 d-flex align-items-center">
    <div class="col-3">
      <span class="p-0">
        <DoughnutChart
          :chartdata="chartdata"
          :options="options"
          height="125"
          width="125"
        />
      </span>
    </div>
    <div class="col-9">
      <div class="row">
        <div class="col-12 col-md-3">
          <div class="p-1 d-flex flex-column border-left border-info com-border-w10">
            <div
              class="com-font-s13-w700"
              v-text="partition[0].label"
            />
            <div class="d-none d-md-block">
              <div
                class="com-font-s13-w400"
                v-text="partition[0].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
              />
              <div class="com-font-s13-w400">{{ partition[0].percent }}%</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="p-1 d-flex flex-column border-left border-success com-border-w10">
            <div
              class="com-font-s13-w700"
              v-text="partition[1].label"
            />
            <div class="d-none d-md-block">
              <div
                class="com-font-s13-w400"
                v-text="partition[1].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
              />
              <div class="com-font-s13-w400">{{ partition[1].percent }}%</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="p-1 d-flex flex-column border-left border-warning com-border-w10">
            <div
              class="com-font-s13-w700"
              v-text="partition[2].label"
            />
            <div class="d-none d-md-block">
              <div
                class="com-font-s13-w400"
                v-text="partition[2].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
              />
              <div class="com-font-s13-w400">{{ partition[2].percent }}%</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="p-1 d-flex flex-column border-left border-danger com-border-w10">
            <div
              class="com-font-s13-w700"
              v-text="partition[3].label"
            />
            <div class="d-none d-md-block">
              <div
                class="com-font-s13-w400"
                v-text="partition[3].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
              />
              <div class="com-font-s13-w400">{{ partition[3].percent }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    partition: {
      type: Array,
      required: true,
      note: "The data to make the chart"
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
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
    labels() {
      let labels = [];
      this.partition.forEach(type => {
        labels.push(type.label);
      });
      return labels;
    },
    datasets() {
      let data = [];
      this.partition.forEach(type => {
        data.push(type.percent);
      });
      return data;
    },
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.datasets,
            backgroundColor: ["#3399ff", "#33cc99", "#ffcc00", "#cc3333"]
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.com-border-w10 {
  border-width: 10px !important;
}
</style>
