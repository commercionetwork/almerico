<template>
  <div class="p-1 bg-white rounded-lg">
    <div class="row p-1 d-flex align-items-center">
      <div class="col-12 col-sm-6 d-flex justify-content-start">
        <router-link
          :to="toDetails(ROUTE_NAMES.VOTING_DETAILS, id)"
          class="com-font-s14-w700"
          v-text="hashtag"
        />
      </div>
      <div class="col-12 col-sm-6 d-flex justify-content-start justify-content-sm-end">
        <span
          class="px-3 py-auto rounded-pill text-white com-font-s12-w400"
          :class="statusStyle"
          v-text="status"
        />
      </div>
    </div>
    <div class="row p-1 d-flex align-items-center">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.title')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <span v-text="votingTitle" />
      </div>
    </div>
    <div class="row p-1 d-flex align-items-center">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.type')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <span v-text="votingType" />
      </div>
    </div>
    <div class="row p-1 d-flex align-items-center">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.description')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <span v-text="votingDescription" />
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES, VOTING_STATUS } from "Constants";

export default {
  name: "CellVoting",
  description: "Display a voting",
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a proposal"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    id() {
      return this.voting.id;
    },
    hashtag() {
      return `#${this.id}`;
    },
    votingDescription() {
      return this.voting.content.value.description
        ? this.voting.content.value.description
        : "-";
    },
    votingType() {
      return this.voting.content.type ? this.voting.content.type : "-";
    },
    votingTitle() {
      return this.voting.content.value.title
        ? this.voting.content.value.title
        : "-";
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
