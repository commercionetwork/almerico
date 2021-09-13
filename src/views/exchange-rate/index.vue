<template>
  <div>
    <ExchangeRateHeaderComponent />
    <ExchangeRateBodyComponent />
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
    ...mapActions('spreadsheet', {
      initSpreadsheet: 'initSpreadsheet',
    }),
  },
  created() {
    this.initSpreadsheet();
  },
};
</script>
