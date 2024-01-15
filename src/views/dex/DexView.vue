<template>
  <the-alert-notice
    v-if="!hasContract"
    kind="info"
    :message="$t('msgs.comingSoon')"
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
import { CONFIG, CONTRACT } from '@/constants';
import { bech32Manager } from '@/utils';

export default {
  name: 'DexView',
  components: { DexViewForm },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('dex', ['error', 'isLoading']),
    ...mapGetters('keplr', ['accounts']),
    hasContract() {
      const prefix = bech32Manager.extractPrefix(CONTRACT.ADDRESS.DEX);
      return prefix === CONFIG.PREFIXES.ACCOUNT.ADDRESS;
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
