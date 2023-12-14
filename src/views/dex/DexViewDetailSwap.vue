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
      <base-small-window :title="$t('titles.swap')">
        <template #main-content>
          <dex-view-swap-form />
        </template>
        <template #bottom-content> </template>
      </base-small-window>
    </v-col>
  </v-row>
</template>

<script>
import DexViewSwapForm from './detail/swap/DexViewSwapForm.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DexViewDetailSwap',
  components: { DexViewSwapForm },
  props: {
    id: {
      type: String,
      required: true,
      note: 'The contract address',
    },
  },
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapGetters('dexDetail', ['error', 'isLoading', 'hasWallet']),
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
    onComplete(model) {
      this.model = model;
    },
    onInvalid() {
      this.model = null;
    },
    onSuccess() {
      this.initDexManagement(this.dexId);
    },
  },
};
</script>
