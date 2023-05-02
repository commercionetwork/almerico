<template>
  <v-row>
    <v-col v-if="isLoading" cols="12" class="pa-5" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      v-else-if="!isLoading && error"
      cols="12"
      class="pa-5"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col v-else cols="12" class="mb-1" data-test="content">
      <the-header-content :title="$t('titles.validators')" />
      <validators-view-list-content-top />
      <wallet-summary v-if="isInitialized" data-test="wallet-summary" />
      <validators-view-list-table />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewListContentTop from './list/ValidatorsViewListContentTop.vue';
import ValidatorsViewListTable from './list/ValidatorsViewListTable.vue';
import WalletSummary from './list/summary/WalletSummary.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewList',
  components: {
    ValidatorsViewListContentTop,
    ValidatorsViewListTable,
    WalletSummary,
  },
  computed: {
    ...mapGetters('application', ['eventHeight']),
    ...mapGetters('keplr', ['isInitialized']),
    ...mapGetters('validators', ['error', 'isLoading']),
  },
  watch: {
    eventHeight(value) {
      if (value) this.fetchList();
    },
  },
  created() {
    this.initValidatorsList();
  },
  methods: {
    ...mapActions('validators', ['initValidatorsList', 'fetchList']),
  },
};
</script>
