<template>
  <v-row>
    <v-col v-if="isLoading" cols="12" class="pa-5" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      v-else-if="!isLoading && error"
      cols="12"
      class="pa-5"
      data-test="error"
    >
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col v-else cols="12" class="mb-1" data-test="content">
      <TheHeaderContent :title="$t('titles.validators')" />
      <ValidatorsViewListContentTop />
      <WalletSummary v-if="isInitialized" data-test="wallet-summary" />
      <ValidatorsViewListTable />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import ValidatorsViewListContentTop from './list/ValidatorsViewListContentTop.vue';
import ValidatorsViewListTable from './list/ValidatorsViewListTable.vue';
import WalletSummary from './list/summary/WalletSummary.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewList',
  components: {
    BaseLoadingLinear,
    TheErrorMessage,
    TheHeaderContent,
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
