<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title class="text-overline font-weight-bold">
      <i18n tag="span" path="titles.lastBlocks">
        <span v-text="limit" />
      </i18n>
    </v-card-title>
    <v-card-text v-if="!blocks.length" data-test="info">
      <v-alert type="info">
        <span v-text="$t('msgs.notAvailable')" />
      </v-alert>
    </v-card-text>
    <v-card-text v-else data-test="content">
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <ul class="monitor">
            <li
              v-for="(block, index) in blocks"
              :key="index"
              class="box"
              :class="getItemStyle(block, index)"
              :title="block.height"
            />
          </ul>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center">
          <i18n tag="span" path="msgs.lostBlocks">
            <span
              class="font-weight-bold"
              :class="missedBlocksCounter > 4000 ? 'error--text' : ''"
              v-text="missedBlocksCounter"
            />
          </i18n>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import '@/assets/style/block-monitor.scss';
import { VALIDATORS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailBlocksMonitor',
  data() {
    return {
      isMonitorUpdating: false,
    };
  },
  computed: {
    ...mapGetters('validators', [
      'isUpdating',
      'detail',
      'missedBlocksCounter',
    ]),
    limit() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;
    },
    blocks() {
      return this.detail.blocks || [];
    },
  },
  watch: {
    isUpdating(value) {
      if (value) this.isMonitorUpdating = value;
    },
  },
  methods: {
    getItemStyle(el, i) {
      let style = !el.status ? 'box-lost' : 'box-attended';
      if (this.isMonitorUpdating) {
        setTimeout(() => (this.isMonitorUpdating = false), 500);
        if (i === 0) {
          style = 'box-incoming';
        }
        if (i === VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT - 1) {
          style = 'box-outgoing';
        }
        style += ' box-rotation';
      }
      return style;
    },
  },
};
</script>
