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
      <the-header-content :title="$t('titles.poolsList')" />
      <pools-view-list-table />
    </v-col>
  </v-row>
</template>

<script>
import PoolsViewListTable from './list/PoolsViewListTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PoolsViewList',
  components: {
    PoolsViewListTable,
  },
  computed: {
    ...mapGetters('poolsList', ['error', 'isLoading']),
  },
  created() {
    this.initPoolsList();
  },
  methods: {
    ...mapActions('poolsList', ['initPoolsList']),
  },
};
</script>
