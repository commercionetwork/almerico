<template>
  <div class="row p-1 bg-white">
    <div class="col-12 col-md-4 col-xl-3 d-flex flex-column justify-content-start align-items-start">
      <span
        class="pt-1 com-font-s16-w700"
        v-text="$t('labels.total')"
      />
      <span class="pl-1 com-font-s16-w400">
        {{ $n(totals, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
        }) }} {{ "COMM" }}
      </span>
    </div>
    <div class="col-12 col-md-8 col-xl-5">
      <div class="row">
        <div class="col-12 col-md-6 d-flex flex-column align-items-start">
          <span
            class="pt-1 com-font-s14-w700"
            v-text="labels[0]"
          />
          <span class="pl-1 com-font-s14-w400">
            {{ $n(delegationsAmount, {
            style: "decimal",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
            }) }} {{ "COMM" }}
          </span>
          <span
            class="pt-1 com-font-s14-w700"
            v-text="labels[3]"
          />
          <span class="pl-1 com-font-s14-w400">
            {{ $n(unbondingDelegationsAmount, {
            style: "decimal",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
            }) }} {{ "COMM" }}
          </span>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column align-items-start">
          <span
            class="pt-1 com-font-s14-w700"
            v-text="labels[2]"
          />
          <span class="pl-1 com-font-s14-w400">
            {{ $n(rewardsAmount, {
            style: "decimal",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
            }) }} {{ "COMM" }}
          </span>
          <span
            class="pt-1 com-font-s14-w700"
            v-text="labels[1]"
          />
          <span class="pl-1 com-font-s14-w400">
            {{ $n(outstandingRewardsAmount, {
            style: "decimal",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
            }) }} {{ "COMM" }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-12 col-xl-4 py-3 py-xl-0">
      <DoughnutChart
        :chartdata="chartdata"
        :options="options"
        height="125"
        width="125"
      />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

import api from "Store/validators/api";

export default {
  name: "AccountHeaderChart",
  description: "Display the account chart",
  components: {
    DoughnutChart
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Delegations list"
    },
    outstandings: {
      type: Array,
      required: true,
      note: "Outstanding rewards list"
    },
    rewards: {
      type: Array,
      required: true,
      note: "Rewards list"
    },
    unbondings: {
      type: Array,
      required: true,
      note: "Unbonding delegations list"
    }
  },
  data() {
    return {
      labels: [
        this.$t("labels.delegated"),
        this.$t("labels.outstandingRewards"),
        this.$t("labels.rewards"),
        this.$t("labels.unbonded")
      ],
      totals: 0,
      chartdata: null,
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
    delegationsAmount() {
      let amount = 0;
      this.delegations.forEach(element => {
        amount += parseFloat(element.shares);
      });
      return amount / 1000000;
    },
    outstandingRewardsAmount() {
      let amount = 0;
      this.outstandings.forEach(element => {
        amount += parseFloat(element.amount);
      });
      return amount / 1000000;
    },
    rewardsAmount() {
      let amount = 0;
      this.rewards.forEach(element => {
        amount += parseFloat(element.amount);
      });
      return amount / 1000000;
    },
    unbondingDelegationsAmount() {
      let amount = 0;
      this.unbondings.forEach(element => {
        element.entries.forEach(entry => {
          amount += parseFloat(entry.balance);
        });
      });
      return amount / 1000000;
    }
  },
  methods: {
    setChartdata() {
      this.setTotals();
      let data = [
        this.getPercent(this.delegationsAmount, this.totals),
        this.getPercent(this.outstandingRewardsAmount, this.totals),
        this.getPercent(this.rewardsAmount, this.totals),
        this.getPercent(this.unbondingDelegationsAmount, this.totals)
      ];
      this.chartdata = {
        labels: this.labels,
        datasets: [
          {
            data,
            backgroundColor: ["#33cc99", "#3399ff", "#ffcc00", "#cc3333"]
          }
        ]
      };
    },
    getPercent(value, total) {
      return ((value / total) * 100).toFixed(2);
    },
    setTotals() {
      this.totals =
        this.delegationsAmount +
        this.outstandingRewardsAmount +
        this.rewardsAmount +
        this.unbondingDelegationsAmount;
    }
  },
  created() {
    this.setChartdata();
  }
};
</script>
