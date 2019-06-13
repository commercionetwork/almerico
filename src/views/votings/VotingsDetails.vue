<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votingDetails')"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div>
        <VotingsDetailsHeader :voting="voting" />
      </div>
      <div class="mt-3">
        <VotingsDetailsVote :voting="voting" />
      </div>
      <div class="mt-3">
        <VotingsDetailsVotesList />
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import VotingsDetailsHeader from "./VotingsDetailsHeader.vue";
import VotingsDetailsVote from "./VotingsDetailsVote.vue";
import VotingsDetailsVotesList from "./VotingsDetailsVotesList.vue";

//TODO: remove
import { mockVoting } from "Store/votings/__mocks__/votings";

export default {
  name: "VotingsDetails",
  description: "Display the voting details",
  components: {
    SectionHeader,
    VotingsDetailsHeader,
    VotingsDetailsVote,
    VotingsDetailsVotesList
  },
  computed: {
    voting() {
      return mockVoting(this.votingId);
    },
    votingId() {
      return this.$route.params.id;
    }
  }
};
</script>
