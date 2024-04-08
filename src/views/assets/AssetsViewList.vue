<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.assets')" />
      <assets-view-list-table />
      <assets-modal-ibc-transfer />
    </v-col>
  </v-row>
</template>

<script>
import AssetsViewListTable from './list/AssetsViewListTable.vue';
import AssetsModalIbcTransfer from './ibc/AssetsModalIbcTransfer';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewList',
  components: {
    AssetsViewListTable,
    AssetsModalIbcTransfer,
  },
  computed: {
    ...mapGetters('assetsList', ['error', 'isLoading']),
    ...mapGetters('keplr', ['wallet']),
  },
  watch: {
    wallet(newValue) {
      if (newValue) {
        this.initAssetsList(newValue);
      }
    },
  },
  created() {
    this.initAssetsList(this.wallet);
  },
  methods: {
    ...mapActions('assetsList', ['initAssetsList']),
  },
};
</script>
