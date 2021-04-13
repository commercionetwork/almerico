<template>
  <v-card outlined :loading="isLoading">
    <v-card-title
      class="justify-center text-center text-overline font-weight-bold"
      v-text="title"
    />
    <v-card-text v-if="isLoading" data-test="loading">
      <v-alert type="info">Loading ...</v-alert>
    </v-card-text>
    <v-card-text
      v-else-if="!isLoading && verifiedBlocks.length > 0"
      data-test="content"
    >
      <div class="grid">
        <div
          v-for="(verified, index) in verifiedBlocks"
          :key="index"
          :class="verified.status === 0 ? 'missing' : ''"
          :title="verified.height"
        />
      </div>
    </v-card-text>
    <v-card-text v-else data-test="warning">
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
      latest: 'latest',
      blocks: 'blocks',
    }),
    ...mapGetters('validators', {
      details: 'details',
      latestValidatorsSets: 'latestValidatorsSets',
    }),
    title() {
      return `Last ${CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT} Blocks`;
    },
    verifiedBlocks() {
      if (this.blocks.length < CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT) {
        return [];
      }
      const restrictedBlocks = blocksHandler.restrictBlocks({
        blocks: this.blocks,
        prop: ['header', 'height'],
        limit: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
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
        items: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
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
