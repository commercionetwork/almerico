<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.votings')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div
      v-if="$config.votings.live_data.enabled"
      class="row my-1"
      data-test="live-data"
    >
      <div class="col-12">
        <SectionHeader
          :bondedEnabled="$config.votings.live_data.bonded"
          :heightEnabled="$config.votings.live_data.height"
          :priceEnabled="$config.votings.live_data.price"
        />
      </div>
    </div>
    <div class="row rounded com-bg-body">
      <div class="col-12 py-1">
        <div
          v-if="isFetching"
          class="alert alert-warning"
          role="alert"
          v-text="$t('messages.loading')"
          data-test="loading"
        />
        <div
          v-else-if="!isFetching && votingsList.length > 0"
          class="row"
          data-test="items"
        >
          <div
            class="col-12 col-md-6"
            v-for="(voting, index) in votingsList"
            :key="index"
          >
            <CellVoting :voting="voting" />
          </div>
        </div>
        <div
          v-else
          class="alert alert-info"
          role="alert"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CellVoting from "./CellVoting.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchBar from "Components/common/SearchBar.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Votings",
  description: "Container for votings' section",
  components: {
    CellVoting,
    SectionHeader,
    SearchBar
  },
  computed: {
    ...mapGetters("votings", {
      isFetching: "isFetching",
      votings: "votings"
    }),
    votingsList() {
      const votings = [...this.votings];
      return votings.sort(function(a, b) {
        return b.proposal_id - a.proposal_id;
      });
    }
  },
  methods: {
    ...mapActions("votings", {
      getVotings: "getVotings"
    })
  },
  created() {
    this.getVotings({});
  }
};
</script>
