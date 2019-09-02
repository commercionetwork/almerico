<template>
  <div class="card m-2">
    <div class="card-header text-center">
      <span
        class="text-dark"
        v-text="votingTitle"
      />
    </div>
    <div class="card-body">
      <div>
        <router-link
          :to="toDetails(ROUTE_NAMES.VOTING_DETAILS, id)"
          v-text="hashtag"
        />
      </div>
      <div class="row p-1 d-flex align-items-center">
        <div
          class="col-12 col-md-3 text-dark"
          v-text="$t('labels.type')"
        />
        <div class="col-12 col-md-9">
          <span class="text-dark" v-text="votingType" />
        </div>
      </div>
      <div class="row p-1 d-flex align-items-center">
        <div
          class="col-12 col-md-3 text-dark"
          v-text="$t('labels.description')"
        />
        <div class="col-12 col-md-9">
          <span class="text-dark" v-text="votingDescription" />
        </div>
      </div>
    </div>
    <div
      class="card-footer"
      :class="statusStyle"
    >
      <span v-text="status" />
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
          style = "bg-info";
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
