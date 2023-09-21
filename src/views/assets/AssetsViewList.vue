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
    </v-col>
  </v-row>
</template>

<script>
import AssetsViewListTable from './list/AssetsViewListTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewList',
  components: {
    AssetsViewListTable,
  },
  computed: {
    ...mapGetters('assets', ['error', 'isLoading']),
  },
  created() {
    this.initAssetsList();
  },
  methods: {
    ...mapActions('assets', ['initAssetsList']),
  },
};
</script>
