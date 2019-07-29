<template>
  <div class="p-1 rounded-lg">
    <div class="row d-flex align-items-center">
      <div class="col-12 col-sm-6 d-flex justify-content-start">
        <span
          class="com-font-s14-w700"
          v-html="hashtag"
        />
      </div>
      <div class="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end">
        <span
          class="px-3 py-auto rounded-pill text-white com-font-s12-w400"
          :class="statusStyle"
          v-html="status"
        />
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center">
        <span class="p-0">
          <DoughnutChart
            :chartdata="chartdata"
            :options="options"
            height="65"
            width="65"
          />
        </span>
      </div>
      <div class="col-12 col-sm-7">
        <div class="d-flex justify-content-start com-font-s13-w400">
          {{ $t('labels.proposer') }}:
          <router-link
            class="pl-1"
            v-text="voting.proposer.name"
            :to="toAccountDetails(voting.proposer.address)"
          />
        </div>
        <div class="d-flex justify-content-start com-font-s14-w400">
          {{ voting.title }}
        </div>
        <span class="d-flex flex-row justify-content-start">
          <div class="pr-1 flex-grow-0 border-right border-dark">
            <div class="com-font-s12-w700">Quorum</div>
            <div class="com-font-s12-w400">{{ voting.poll.quorum }}%</div>
          </div>
          <div class="pl-1 flex-grow-1">
            <div class="com-font-s12-w700">Most voted on</div>
            <div class="com-font-s12-w400">{{ winner.label }} ({{ winner.percent }}%)</div>
          </div>
        </span>

      </div>
      <div class="col-12 col-sm-2 d-flex justify-content-end align-items-center">
        <router-link
          :to="toDetails"
          class="btn text-black-50"
        >
          <Icon
            name="chevron-right"
            scale="1.5"
          />
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
// import DoughnutChart from "Components/common/DoughnutChart.vue";

// import Icon from "vue-awesome/components/Icon.vue";
// import "vue-awesome/icons/chevron-right";

import { ROUTE_NAMES, VOTING_STATUS } from "Constants";

export default {
  name: "CellVoting",
  description: "Display a voting",
  components: {
    // DoughnutChart,
    // Icon
  },
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a proposal"
    }
  },
  data() {
    return {
      ROUTE_NAMES,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          titleFontSize: 9,
          bodyFontSize: 9
        }
      }
    };
  },
  computed: {
    id() {
      return this.voting.proposal_id;
    },
    hashtag() {
      return `#${this.id}`;
    },
    status() {
      return this.voting.proposal_status;
    },
    statusStyle() {
      let style;
      switch (this.status) {
        case VOTING_STATUS.DEPOSIT_PERIOD:
          style = "bg-info";
          break;
        case VOTING_STATUS.PASSED:
          style = "bg-success";
          break;
        case VOTING_STATUS.REJECTED:
          style = "bg-danger";
          break;
        case VOTING_STATUS.VOTING_PERIOD:
          style = "bg-warning";
          break;
        default:
          style = "bg-dark";
          break;
      }
      return style;
    },
    votes() {
      return this.voting.poll.votes;
    },
    labels() {
      let labels = [];
      this.votes.forEach(vote => {
        labels.push(vote.label);
      });
      return labels;
    },
    data() {
      let data = [];
      this.votes.forEach(vote => {
        data.push(vote.percent);
      });
      return data;
    },
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ["#38BA8C", "#FFCC33", "#CC3333", "#3C3C3C"]
          }
        ]
      };
    },
    winner() {
      return this.votes.reduce((prev, current) =>
        prev.count > current.count ? prev : current
      );
    }
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
