<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.votings')" />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div
          class="col-12 col-md-6 p-1"
          v-for="voting in votings"
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

export default {
  name: "Votings",
  description: "Container for votings' section",
  components: {
    CellVoting,
    SectionHeader
  },
  computed: {
    votings() {
      return [];
    }
  }
};
</script>
