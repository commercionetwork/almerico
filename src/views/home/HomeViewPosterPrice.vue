<template>
  <BaseTopContentCard :loading="isLoading" :title="$t('titles.price')">
    <template v-slot:content>
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
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { mapGetters } from 'vuex';
import { CONFIG } from '@/constants';

export default {
  name: 'HomeViewPosterPrice',
  components: { BaseTopContentCard },
  data: () => ({
    CONFIG,
  }),
  computed: {
    ...mapGetters('home', {
      isLoading: 'isLoadingParams',
      rate: 'conversionRate',
    }),
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    tokenDenom() {
      return this.params.bond_denom.substring(1, 4);
    },
    tokenValue() {
      return !isNaN(this.rate) && this.rate > 0
        ? (1 / this.rate).toFixed(2)
        : '-';
    },
  },
};
</script>
