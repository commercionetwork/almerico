<template>
  <div>
    <ExchangeRateViewContentTop :rate="exchangeRate" />
    <ExchangeRateViewContentBody />
  </div>
</template>

<script>
import ExchangeRateViewContentBody from './ExchangeRateViewContentBody.vue';
import ExchangeRateViewContentTop from './ExchangeRateViewContentTop.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewOverview',
  components: {
    ExchangeRateViewContentBody,
    ExchangeRateViewContentTop,
  },
  computed: {
    ...mapGetters('exchangeRate', ['overview']),
    exchangeRate() {
      const lastRow = this.overview.data[this.overview.data.length - 1];
      return this.lastRow ? 1 / lastRow.percentage : '-';
    },
  },
};
</script>
