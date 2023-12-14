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
      <the-header-content :title="$t('titles.dexList')" />
      <dex-view-table />
    </v-col>
  </v-row>
</template>

<script>
import DexViewTable from './list/DexViewTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DexViewList',
  components: {
    DexViewTable,
  },
  computed: {
    ...mapGetters('dexList', ['error', 'isLoading']),
  },
  created() {
    this.initDexList();
  },
  methods: {
    ...mapActions('dexList', ['initDexList']),
  },
};
</script>
