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
      <the-header-content :title="$t('titles.assetDetail')" />
      <v-row>
        <v-col cols="12">
          <assets-view-detail-contract />
        </v-col>
        <v-col cols="12">
          <assets-view-detail-marketing />
        </v-col>
        <v-col cols="12">
          <assets-view-detail-technical />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AssetsViewDetailContract from './detail/AssetsViewDetailContract.vue';
import AssetsViewDetailMarketing from './detail/AssetsViewDetailMarketing.vue';
import AssetsViewDetailTechnical from './detail/AssetsViewDetailTechnical.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetail',
  components: {
    AssetsViewDetailTechnical,
    AssetsViewDetailContract,
    AssetsViewDetailMarketing,
  },
  computed: {
    ...mapGetters('assets', ['error', 'isLoading']),
  },
  created() {
    this.initAssetsDetail(this.$route.params.id);
  },
  methods: {
    ...mapActions('assets', ['initAssetsDetail']),
  },
};
</script>
