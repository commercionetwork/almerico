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
      <the-header-content :title="$t('titles.dexDetail')" />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DexViewDetail',
  props: {
    id: {
      type: String,
      required: true,
      note: 'The contract address',
    },
  },
  computed: {
    ...mapGetters('dexDetail', ['error', 'isLoading', 'hasWallet', 'contract']),
    ...mapGetters('keplr', ['accounts']),
  },
  watch: {
    accounts(newValue) {
      if (newValue) {
        this.initDexDetail(this.id);
      }
    },
  },
  created() {
    this.initDexDetail(this.id);
  },
  methods: {
    ...mapActions('dexDetail', ['initDexDetail']),
  },
};
</script>
