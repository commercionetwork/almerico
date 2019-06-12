<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votings')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div
          class="col-12 col-md-6 p-1"
          v-for="voting in votings.slice().reverse()"
          :key="voting.id"
        >
          <CellVoting :voting="voting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellVoting from "./CellVoting.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

//TODO: remove
import { mockVotings } from "Store/votings/__mocks__/votings";

export default {
  name: "Votings",
  description: "Container for votings' section",
  components: {
    CellVoting,
    SectionHeader
  },
  computed: {
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
    },
    votings() {
      return mockVotings();
    }
  }
};
</script>
