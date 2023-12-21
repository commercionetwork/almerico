<template>
  <the-alert-notice
    v-if="!hasWallet"
    kind="warning"
    :message="$t('msgs.noWalletConnected')"
    data-test="alert"
  />
  <v-row v-else data-test="view">
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
      <the-header-content :title="$t('titles.dex')" />
      <dex-view-form />
    </v-col>
  </v-row>
</template>

<script>
import DexViewForm from './DexViewForm.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DexView',
  components: { DexViewForm },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('dex', ['error', 'isLoading', 'hasWallet']),
    ...mapGetters('keplr', ['accounts']),
  },
  watch: {
    accounts(newValue) {
      if (newValue) {
        this.initDex();
      }
    },
  },
  created() {
    this.initDex();
  },
  methods: {
    ...mapActions('dex', ['initDex']),
  },
};
</script>
