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
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetailTransfer',
  computed: {
    ...mapGetters('assets', ['error', 'isLoading']),
    address() {
      return this.$route.params.id;
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
