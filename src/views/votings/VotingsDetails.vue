<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votingDetails')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div>
      <VotingsDetailsHeader :voting="voting" />
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import VotingsDetailsHeader from "./VotingsDetailsHeader.vue";

//TODO: remove
import { mockVoting } from "Store/votings/__mocks__/votings";

export default {
  name: "VotingsDetails",
  description: "Display the voting details",
  components: {
    SectionHeader,
    VotingsDetailsHeader
  },
  computed: {
    voting() {
      return mockVoting(this.votingId);
    },
    votingId() {
      return this.$route.params.id;
    },
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  }
};
</script>
