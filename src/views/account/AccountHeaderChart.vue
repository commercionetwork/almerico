<template>
  <div class="row bg-white">
    <div class="col-12 col-md-6 px-1 py-3 px-md-3">
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.availables')"
        />
        <span
          class="com-font-s14-w400"
          v-text="availablesAmount"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.delegated')"
        />
        <span
          class="com-font-s14-w400"
          v-text="delegationsAmount"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.unbonded')"
        />
        <span
          class="com-font-s14-w400"
          v-text="unbondingDelegationsAmount"
        />
      </div>
      <div class="d-flex justify-content-between align-items-center border-bottom">
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.rewards')"
        />
        <span
          class="com-font-s14-w400"
          v-text="rewardsAmount"
        />
      </div>
      <div class="py-2 d-flex justify-content-between align-items-center com-font-s16-w700">
        <span v-text="$t('labels.total')" />
        <span v-text="totalsAmount" />
      </div>
    </div>
    <div class="col-12 col-md-6 px-1 py-3 px-md-3">
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

import { coinConverter } from "Utils";
import { mapGetters } from "vuex";

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
        this.$t("labels.availables"),
        this.$t("labels.delegated"),
        this.$t("labels.unbonded"),
        this.$t("labels.rewards")
      ],
      totalAvailables: 0,
      totalDelegated: 0,
      totalUnbonded: 0,
      totalRewards: 0,
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
    ...mapGetters("account", {
      balances: "balances"
    }),
    denom() {
      return this.balances && this.balances.length > 0
        ? this.balances[0].denom
        : "";
    },
    availablesAmount() {
      let amount = {
        denom: "",
        amount: 0
      };
      if (this.balances && this.balances.length > 0) {
        amount = coinConverter(this.balances[0]);
        this.totalAvailables = parseFloat(this.balances[0].amount);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    delegationsAmount() {
      this.delegations.forEach(element => {
        this.totalDelegated += parseFloat(element.shares);
      });
      let amount = coinConverter({
        denom: this.denom,
        amount: this.totalDelegated
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    rewardsAmount() {
      this.rewards.forEach(element => {
        this.totalRewards += parseFloat(element.amount);
      });
      let amount = coinConverter({
        denom: this.denom,
        amount: this.totalRewards
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    unbondingDelegationsAmount() {
      this.unbondings.forEach(element => {
        element.entries.forEach(entry => {
          this.totalUnbonded += parseFloat(entry.balance);
        });
      });
      let amount = coinConverter({
        denom: this.denom,
        amount: this.totalUnbonded
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    totalsAmount() {
      let amount = coinConverter({
        denom: this.denom,
        amount: this.totals
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    totals() {
      return (
        this.totalAvailables +
        this.totalDelegated +
        this.totalRewards +
        this.totalUnbonded
      );
    }
  },
  watch: {
    totals(value) {
      if (value > 0) this.setChartdata();
    }
  },
  methods: {
    setChartdata() {
      let data = [
        this.getPercent(this.totalAvailables, this.totals),
        this.getPercent(this.totalDelegated, this.totals),
        this.getPercent(this.totalUnbonded, this.totals),
        this.getPercent(this.totalRewards, this.totals)
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
    }
  }
};
</script>
