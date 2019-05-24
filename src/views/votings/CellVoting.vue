<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row d-flex align-items-center">
        <div class="col-12 col-sm-6 d-flex justify-content-start">
          <span
            class="com-font-s14-w700"
            v-html="hashtag"
          />
        </div>
        <div class="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end">
          <span
            class="px-3 rounded-pill bg-dark text-white com-font-s12-w400"
            v-html="status"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-3 d-flex justify-content-center align-items-center">
          <span class="p-0">
            <DoughnutChart
              :chartdata="chartdata"
              :options="options"
            />
          </span>
        </div>
        <div class="col-12 col-sm-7">
          <div class="d-flex justify-content-start com-font-s12-w400">
            Proposer:<span class="pl-1 text-info">commerc.io network</span>
          </div>
          <div class="d-flex justify-content-start com-font-s13-w400">
            Join the commerc.io network now
          </div>
          <span class="d-flex flex-row justify-content-start">
            <div class="pr-1 flex-grow-0 border-right border-dark">
              <div class="com-font-s11-w700">Quorum</div>
              <div class="com-font-s11-w400">76.54%</div>
            </div>
            <div class="pl-1 flex-grow-1">
              <div class="com-font-s11-w700">Most voted on</div>
              <div class="com-font-s11-w400">{{ pollLabel }} ({{ pollValue }}%)</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/chevron-right";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "CellVoting",
  description: "Display a voting",
  components: {
    DoughnutChart,
    Icon
  },
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a voting"
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
          titleFontSize: 9,
          bodyFontSize: 9
        }
      }
    };
  },
  computed: {
    toDetails() {
      return {
        name: ROUTE_NAMES.VOTINGS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: this.voting.id
        }
      };
    },
    isFetching() {
      return false;
    },
    id() {
      return this.voting.id;
    },
    hashtag() {
      return this.voting.hashtag;
    },
    status() {
      return this.voting.status;
    },
    chartdata() {
      return this.voting.polls;
    },
    pollLabel() {
      return this.chartdata.labels[0];
    },
    pollValue() {
      return this.chartdata.datasets[0].data[0];
    }
  }
};
</script>
