<template>
  <div>
    <exchange-rate-view-content-top />
    <exchange-rate-view-content-body />
  </div>
</template>

<script>
import ExchangeRateViewContentBody from './ExchangeRateViewContentBody.vue';
import ExchangeRateViewContentTop from './ExchangeRateViewContentTop.vue';

export default {
  name: 'ExchangeRateViewOverview',
  components: {
    ExchangeRateViewContentBody,
    ExchangeRateViewContentTop,
  },
};
</script>
