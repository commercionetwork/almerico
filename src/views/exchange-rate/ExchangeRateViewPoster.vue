<template>
  <base-top-content-card :title="$t('titles.cccExchangeRate')">
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
  </base-top-content-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewPoster',
  computed: {
    ...mapGetters('exchangeRate', ['overview']),
    rate() {
      const rate = this.overview.specs.find((spec) => spec.name === 'rate');
      return parseFloat(rate.content).toFixed(2) || '-';
    },
  },
};
</script>
