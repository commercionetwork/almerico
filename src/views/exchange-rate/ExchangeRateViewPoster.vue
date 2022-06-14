<template>
  <BaseTopContentCard :title="$t('titles.cccExchangeRate')">
    <template #content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-center"
      >
        <div class="py-1 text-h2 font-weight-black" v-text="rate" />
        <div
          class="text-caption font-weight-bold info--text"
          v-text="$t('msgs.exchangeRateCalc')"
        />
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewPoster',
  components: { BaseTopContentCard },
  computed: {
    ...mapGetters('exchangeRate', ['overview']),
    rate() {
      const index = this.overview.data.length - 1;
      const last = this.overview.data[index];
      return (1 / last.percentage).toFixed(2) || '-';
    },
  },
};
</script>
