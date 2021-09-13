<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else-if="!isLoading && error !== null" data-test="error">
    <v-col cols="12" class="pa-5">
      <v-alert border="left" prominent text type="error">
        <span class="text-body-1" v-text="errorMessage" />
      </v-alert>
    </v-col>
  </v-row>
  <ExchangeRateSpreadsheetComponent v-else data-test="content" />
</template>

<script>
import ExchangeRateSpreadsheetComponent from './ExchangeRateSpreadsheetComponent.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateBodyComponent',
  components: { ExchangeRateSpreadsheetComponent },
  computed: {
    ...mapGetters('spreadsheet', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
  },
};
</script>
