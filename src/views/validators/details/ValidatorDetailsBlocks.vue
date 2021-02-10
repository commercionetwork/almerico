<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-title v-text="title" />
    <v-card-text v-if="isLoading">
      <v-alert type="info">Loading ...</v-alert>
    </v-card-text>
    <v-card-text v-else-if="!isLoading && verifiedBlocks.length > 0">
      <div class="grid">
        <div
          v-for="(verified, index) in verifiedBlocks"
          :key="index"
          :class="verified.status === 0 ? 'missing' : ''"
          :title="verified.height"
        />
      </div>
    </v-card-text>
    <v-card-text v-else>
      <v-alert type="warning">Not available</v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { blocksHandler, BlocksAttendanceCalculator } from '@/utils';
import { CUSTOMIZATION } from '@/constants';

export default {
  name: 'ValidatorDetailsBlocks',
  computed: {
    ...mapGetters('blocks', {
      isLoading: 'isLoading',
      error: 'error',
      latest: 'latest',
      blocks: 'blocks',
    }),
    ...mapGetters('validators', {
      details: 'details',
      latestValidatorsSets: 'latestValidatorsSets',
    }),
    title() {
      return `Last ${CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS} Blocks`;
    },
    verifiedBlocks() {
      if (this.blocks.length < CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS) {
        return [];
      }
      const restrictedBlocks = blocksHandler.restrictBlocks({
        blocks: this.blocks,
        prop: ['header', 'height'],
        limit: CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS,
      });
      const attendance = BlocksAttendanceCalculator.setBlocks(restrictedBlocks)
        .setValidator(this.details)
        .setValidatorsSet(this.latestValidatorsSets)
        .get();
      return attendance !== null ? attendance.blocks : [];
    },
  },
  methods: {
    ...mapActions('blocks', {
      getBlocks: 'getBlocks',
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
  content: '';
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
  background-color: #4caf50;
  border: 1px white solid;
}

.missing {
  background-color: #ff5252;
}
</style>
