<template>
  <v-card outlined class="d-flex fill-height flex-column">
    <v-card-title
      class="justify-center text-center text-overline font-weight-bold"
    >
      <i18n tag="span" path="titles.lastBlocks">
        <span v-text="limit" />
      </i18n>
    </v-card-title>
    <v-card-text v-if="!verifiedBlocks.length" data-test="warning">
      <v-alert type="warning" v-text="$t('msgs.notAvailable')" />
    </v-card-text>
    <v-card-text v-else data-test="content">
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <div class="grid">
            <div
              v-for="(verified, index) in verifiedBlocks"
              :key="index"
              :class="verified.status === 0 ? 'missing' : ''"
              :title="verified.height"
            /></div
        ></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { VALIDATORS } from '@/constants';
import validatorAttendanceCalculator from '../helpers/validatorAttendanceCalculator';

export default {
  name: 'ValidatorsDetailBlocksComponent',
  computed: {
    ...mapGetters('validators', {
      detail: 'detail',
      blocks: 'blocks',
    }),
    limit() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;
    },
    verifiedBlocks() {
      return validatorAttendanceCalculator.getDetailDefinedBlocks({
        blocks: this.blocks,
        validator: this.detail,
        limit: this.limit,
      });
    },
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
