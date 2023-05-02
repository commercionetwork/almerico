<template>
  <base-top-content-card :loading="isLoadingParams" :title="$t('titles.price')">
    <template #content>
      <div
        class="fill-height d-flex flex-row justify-space-between align-center"
      >
        <div
          class="d-flex flex-column flex-grow-1 justify-space-between align-center"
        >
          <div
            class="text-overline font-weight-bold"
            v-text="CONFIG.STABLE_COIN.SYMBOL"
          />
          <div
            class="text-h4 font-weight-bold"
            v-text="CONFIG.STABLE_COIN.VALUE.AMOUNT"
          />
        </div>
        <v-divider vertical style="border: 1px solid currentcolor" />
        <div
          class="d-flex flex-column flex-grow-1 justify-space-between align-center"
        >
          <div class="text-overline font-weight-bold" v-text="tokenDenom" />
          <div class="text-h4 font-weight-bold" v-text="tokenValue" />
        </div>
      </div>
    </template>
  </base-top-content-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'HomeViewPosterPrice',
  data() {
    return {
      CONFIG,
    };
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('home', ['isLoadingParams', 'conversionRate']),
    tokenDenom() {
      return this.stakingParams.bond_denom.substring(1, 4);
    },
    tokenValue() {
      return !isNaN(this.conversionRate) && this.conversionRate > 0
        ? (1 / this.conversionRate).toFixed(2)
        : '-';
    },
  },
};
</script>
