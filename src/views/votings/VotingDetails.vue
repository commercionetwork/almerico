<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votingDetails')"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div>
        <VotingDetailsHeader :voting="voting" />
      </div>
      <div class="mt-3">
        <VotingDetailsVote :voting="voting" />
      </div>
      <div class="mt-3">
        <VotingDetailsVotesList />
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import VotingDetailsHeader from "./VotingDetailsHeader.vue";
import VotingDetailsVote from "./VotingDetailsVote.vue";
import VotingDetailsVotesList from "./VotingDetailsVotesList.vue";

//TODO: remove
import { mockProposal } from "Store/votings/__mocks__/proposals";

export default {
  name: "VotingDetails",
  description: "Display the voting details",
  components: {
    SectionHeader,
    VotingDetailsHeader,
    VotingDetailsVote,
    VotingDetailsVotesList
  },
  computed: {
    voting() {
      return mockProposal(this.votingId);
    },
    votingId() {
      return this.$route.params.id;
    }
  }
};
</script>
