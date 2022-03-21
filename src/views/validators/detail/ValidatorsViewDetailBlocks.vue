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
          <div class="grid">
            <div
              v-for="(verified, i) in verifiedBlocks"
              :key="verified.height"
              class="grid__item"
              :class="getItemStyle(verified, i)"
              :title="verified.height"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { VALIDATORS } from '@/constants';
import validatorAttendanceCalculator from '../helpers/validatorAttendanceCalculator';

export default {
  name: 'ValidatorsViewDetailBlocks',
  data() {
    return {
      isMonitorUpdating: false,
    };
  },
  computed: {
    ...mapGetters('validators', {
      isLoadingBlocks: 'isLoadingBlocks',
      detail: 'detail',
      blocks: 'blocks',
    }),
    isFirstloading() {
      return this.isLoadingBlocks && !this.blocks.length;
    },
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
  watch: {
    isLoadingBlocks(value) {
      if (value) this.isMonitorUpdating = value;
    },
  },
  methods: {
    getItemStyle(el, i) {
      let style = !el.status ? 'grid__item-lost' : 'grid__item-attended';
      if (this.isMonitorUpdating) {
        setTimeout(() => (this.isMonitorUpdating = false), 500);
        if (i === 0) style = 'grid__item-incoming';
        if (i === VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT - 1)
          style = 'grid__item-outgoing';
      }
      return style;
    },
  },
};
</script>

<style lang="css" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
  grid-auto-rows: minmax(1.5rem, 1fr);
  grid-gap: 2px;
}

.grid__item {
  border-radius: 2px;
  border-style: solid;
  border-width: 2px;
}

.grid__item-attended {
  background-color: rgba(76, 175, 80, 0.4);
  border-color: rgb(76, 175, 80);
}

.grid__item-lost {
  background-color: rgba(255, 82, 82, 0.4);
  border-color: rgb(255, 82, 82);
}

.grid__item-incoming {
  background-color: rgba(26, 117, 255, 0.4);
  border-color: rgb(26, 117, 255);
}

.grid__item-outgoing {
  background-color: rgba(255, 0, 191, 0.4);
  border-color: rgb(255, 0, 191);
}
</style>
