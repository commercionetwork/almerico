<template>
  <the-alert-notice
    v-if="isDenied"
    kind="warning"
    :message="$t('msgs.accessDenied')"
  />
  <v-row v-else>
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
      <the-header-content :title="$t('titles.newAsset')" />
      <assets-view-new-form />
    </v-col>
  </v-row>
</template>

<script>
import AssetsViewNewForm from './new/AssetsViewNewForm.vue';

import { mapActions, mapGetters } from 'vuex';
import { dateHandler } from '@/utils';

export default {
  name: 'AssetsViewNew',
  components: {
    AssetsViewNewForm,
  },
  computed: {
    ...mapGetters('assets', ['error', 'isLoading']),
    isDenied() {
      const query = this.$route.query;
      if (!query['op']) {
        return true;
      }
      const expexted = dateHandler.getFormattedDate(
        dateHandler.getSubtractedDate(2, 'day'),
        'YYMMDD'
      );
      return expexted !== query['op'];
    },
  },
  created() {
    if (!this.isDenied) {
      this.initAssetsNew({ translator: this.$t, context: this });
    }
  },
  methods: {
    ...mapActions('assets', ['initAssetsNew']),
  },
};
</script>
