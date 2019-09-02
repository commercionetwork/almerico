<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-text="title"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div
      v-if="isFetching"
      class="alert alert-warning"
      role="alert"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      class="alert alert-danger"
      role="alert"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded com-bg-header"
      data-test="item"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <VotingDetailsHeader :voting="voting" />
          </div>
        </div>
        <div class="px-5 py-3 com-bg-body">
          <div class="row py-3">
            <div class="col-12">
              <VotingDetailsResult
                v-if="$config.voting_details.result.enabled"
                :voting="voting"
                data_test="result"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "Components/common/SearchBar.vue";
import VotingDetailsHeader from "./VotingDetailsHeader.vue";
import VotingDetailsResult from "./VotingDetailsResult.vue";
import VotingDetailsVotesList from "./VotingDetailsVotesList.vue";

import api from "Store/votings/api";

export default {
  name: "VotingDetails",
  description: "Display the voting details",
  components: {
    SearchBar,
    VotingDetailsHeader,
    VotingDetailsResult,
    VotingDetailsVotesList
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      voting: {}
    };
  },
  computed: {
    title() {
      let label = this.$t("titles.votingDetails");
      return `${label} #${this.votingId}`;
    },
    votingId() {
      return this.$route.params.id;
    }
  },
  watch: {},
  methods: {
    async fetchVoting(id) {
      this.isFetching = true;
      try {
        const response = await api.requestProposal(id);
        this.voting = response.data.result;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.fetchVoting(this.votingId);
  }
};
</script>
