<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-title v-text="title" />
    <v-card-text v-if="!isLoading">
      <div class="grid">
        <div
          v-for="(verified, index) in verifiedBlocks"
          :key="index"
          :class="verified.missing ? 'missing' : ''"
          :title="verified.header.height"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { BlocksChecker } from "@/utils";
import { CUSTOMIZATION } from "@/constants";

export default {
  name: "ValidatorDetailsBlocks",
  computed: {
    ...mapGetters("blocks", {
      isLoading: "isLoading",
      error: "error",
      latest: "latest",
      blocks: "blocks",
    }),
    ...mapGetters("validators", {
      details: "details",
      latestValidatorsSets: "latestValidatorsSets",
    }),
    title() {
      return `Last ${CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS} Blocks`;
    },
    verifiedBlocks() {
      return BlocksChecker.setBlocks(this.blocks)
        .setValidator(this.details)
        .setValidatorsSet(this.latestValidatorsSets)
        .setItems(CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS)
        .get();
    },
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks",
    }),
  },
  created() {
    if (this.latest !== null) {
      let height = this.latest.header.height;
      this.getBlocks({
        maxHeight: height,
        items: CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS,
      });
    }
  },
};
</script>

<style lang="css" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
  grid-auto-rows: 1fr;
}

.grid::before {
  content: "";
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

/* Just to make the grid visible */

.grid > * {
  background-color: #4CAF50;
  border: 1px white solid;
}

.missing {
  background-color: #ff5252;
}
</style>