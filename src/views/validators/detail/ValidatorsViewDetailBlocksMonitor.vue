<template>
  <v-card
    outlined
    :loading="isFirstloading"
    class="fill-height d-flex flex-column justify-start align-center"
  >
    <v-card-title class="text-overline font-weight-bold">
      <i18n tag="span" path="titles.lastBlocks">
        <span v-text="limit" />
      </i18n>
    </v-card-title>
    <v-card-text v-if="!verifiedBlocks.length" data-test="info">
      <v-alert type="info" v-text="$t('msgs.notAvailable')" />
    </v-card-text>
    <v-card-text v-else data-test="content">
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <ul class="monitor">
            <li
              v-for="(verified, index) in verifiedBlocks"
              :key="index"
              class="box"
              :class="getItemStyle(verified, index)"
              :title="verified.height"
            />
          </ul>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import '@/assets/style/block-monitor.scss';
import validatorAttendanceCalculator from '../helpers/validatorAttendanceCalculator';
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
    ...mapGetters('validators', ['isLoadingBlocks', 'blocks', 'detail']),
    isFirstloading() {
      return this.isLoadingBlocks && !this.blocks.length;
    },
    limit() {
      return VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;
    },
    verifiedBlocks() {
      return this.detail
        ? validatorAttendanceCalculator.getDetailDefinedBlocks({
            blocks: this.blocks,
            validator: this.detail,
            limit: this.limit,
          })
        : [];
    },
  },
  watch: {
    isLoadingBlocks(value) {
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
