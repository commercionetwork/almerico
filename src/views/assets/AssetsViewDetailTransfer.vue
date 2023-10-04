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
      <the-header-content :title="$t('titles.assetTransfer')" />
      <v-card outlined>
        <v-card-title>
          <span v-text="title" />
        </v-card-title>
        <v-card-text>
          <assets-view-detail-transfer-form />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AssetsViewDetailTransferForm from './detail/AssetsViewDetailTransferForm.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetailTransfer',
  components: {
    AssetsViewDetailTransferForm,
  },
  computed: {
    ...mapGetters('assets', ['error', 'isLoading', 'detail']),
    address() {
      return this.$route.params.id;
    },
    title() {
      return this.detail
        ? `${this.detail.token.name} - ${this.detail.token.symbol}`
        : '-';
    },
  },
  created() {
    this.initAssetsTransfer(this.address);
  },
  methods: {
    ...mapActions('assets', ['initAssetsTransfer']),
  },
};
</script>
