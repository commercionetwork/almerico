<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.votings')" />
    <div class="py-3 px-5 rounded">
      <div
        v-if="isFetching"
        class="com-font-s14-w400"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <div
        v-else-if="!isFetching && votingsList.length > 0"
        class="row"
        data-test="items"
      >
        <div
          class="col-12 col-md-6 p-1"
          v-for="(voting, index) in votingsList"
          :key="index"
        >
          <CellVoting :voting="voting" />
        </div>
      </div>
      <div
        v-else
        class="text-center text-info com-font-s14-w700"
        v-text="$t('messages.noItems')"
        data-test="no-items"
      />
    </div>
  </div>
</template>

<script>
import CellVoting from "./CellVoting.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Votings",
  description: "Container for votings' section",
  components: {
    CellVoting,
    SectionHeader
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
    this.getVotings();
  }
};
</script>
