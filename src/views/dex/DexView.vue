<template>
  <the-alert-notice
    v-if="!hasContract"
    kind="info"
    :message="$t('msgs.comingSoon')"
    data-test="alert-contract"
  />
  <the-alert-notice
    v-else-if="hasContract && !hasWallet"
    kind="warning"
    :message="$t('msgs.noWalletConnected')"
    data-test="alert-wallet"
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
import { CONTRACT } from '@/constants';

export default {
  name: 'DexView',
  components: { DexViewForm },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('dex', ['error', 'isLoading', 'hasWallet']),
    ...mapGetters('keplr', ['accounts']),
    hasContract() {
      return !!CONTRACT.ADDRESS.DEX;
    },
  },
  watch: {
    accounts(newValue) {
      if (this.hasContract && newValue) {
        this.initDex(CONTRACT.ADDRESS.DEX);
      }
    },
  },
  created() {
    if (this.hasContract) {
      this.initDex(CONTRACT.ADDRESS.DEX);
    }
  },
  methods: {
    ...mapActions('dex', ['initDex']),
  },
};
</script>
