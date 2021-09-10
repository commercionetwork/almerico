<template>
  <div>
    <ExchangeRateBodyComponent />
    <ExchangeRateHeaderComponent />
  </div>
</template>

<script>
import ExchangeRateBodyComponent from './ExchangeRateBodyComponent.vue';
import ExchangeRateHeaderComponent from './ExchangeRateHeaderComponent.vue';

import { mapActions } from 'vuex';

export default {
  name: 'ExchangeRate',
  components: {
    ExchangeRateBodyComponent,
    ExchangeRateHeaderComponent,
  },
  methods: {
    ...mapActions('overview', {
      init: 'init',
    }),
  },
  mounted() {
    this.init();
  },
};
</script>
