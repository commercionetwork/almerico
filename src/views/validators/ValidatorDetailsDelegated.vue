<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1">
        <div class="col-12">
          <h2 class="com-font-s16-w700">Delegated</h2>
        </div>
      </div>
      <div class="row p-1">
        <div class="col-12 d-flex flex-column">
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.total')"
          />
          <span
            class="com-font-s14-w400"
            v-text="votingPower"
          />
        </div>
      </div>
      <div class="row p-1">
        <div class="col-12 col-md-4 order-3 order-md-1">
          <span class="p-0">
            <DoughnutChart
              :chartdata="chartdata"
              :options="options"
              height="125"
              width="125"
            />
          </span>
        </div>
        <div class="col-12 col-md-4 order-1 order-md-2">
          <div class="d-flex flex-column border-top border-primary com-border-w10">
            <span
              class="com-font-s14-w700"
              v-text="'Self'"
            />
            <span
              class="com-font-s14-w400"
              v-text="selfPercent"
            />
            <span
              class="com-font-s14-w400"
              v-text="selfDelegated"
            />
          </div>
        </div>
        <div class="col-12 col-md-4 order-2 order-md-3">
          <div class="d-flex flex-column border-top border-info com-border-w10">
            <span
              class="com-font-s14-w700"
              v-text="'Others'"
            />
            <span
              class="com-font-s14-w400"
              v-text="othersPercent"
            />
            <span
              class="com-font-s14-w400"
              v-text="othersDelegated"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

export default {
  name: "ValidatorDetailsDelegated",
  description: "Display the validator delegated",
  components: {
    DoughnutChart
  },
  props: {
    validator: {
      type: Object,
      required: true,
      note: "Object representing a validator"
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
    isFetching() {
      return false;
    },
    chartdata() {
      let self = this.validator.voting.delegated_percent;
      let others = 100 - self;
      return {
        labels: ["Self", "Others"],
        datasets: [
          {
            data: [self, others],
            backgroundColor: ["#38BA8C", "#3399FF"]
          }
        ]
      };
    },
    othersDelegated() {
      return (
        this.validator.voting.power - this.validator.voting.delegated
      ).toLocaleString();
    },
    selfDelegated() {
      return this.validator.voting.delegated.toLocaleString();
    },
    othersPercent() {
      let percent = (100 - this.validator.voting.delegated_percent).toFixed(2);
      return `${percent}%`;
    },
    selfPercent() {
      let percent = this.validator.voting.delegated_percent;
      return `${percent}%`;
    },
    votingPower() {
      let power = this.validator.voting.power.toLocaleString();
      return `${power} ATOM`;
    }
  }
};
</script>

<style lang="scss" scoped>
.com-border-w10 {
  border-width: 10px !important;
}
</style>
