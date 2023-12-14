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
      <dex-detail-lp class="mb-1" />
      <dex-detail-token
        class="mb-1"
        :title="CONTRACT.TOKEN.KEY.TOKEN_1"
        :token="token1"
      />
      <dex-detail-token :title="CONTRACT.TOKEN.KEY.TOKEN_2" :token="token2" />
    </v-col>
  </v-row>
</template>

<script>
import DexDetailLp from './detail/DexDetailLp.vue';
import DexDetailToken from './detail/DexDetailToken.vue';

import { mapActions, mapGetters } from 'vuex';
import { CONTRACT } from '@/constants';

export default {
  name: 'DexViewDetail',
  components: {
    DexDetailLp,
    DexDetailToken,
  },
  props: {
    id: {
      type: String,
      required: true,
      note: 'The contract address',
    },
  },
  data() {
    return {
      CONTRACT,
    };
  },
  computed: {
    ...mapGetters('dexDetail', ['error', 'isLoading', 'hasWallet', 'contract']),
    ...mapGetters('keplr', ['accounts']),
    token1() {
      return this.contract[CONTRACT.TOKEN.DENOM.TOKEN_1] || {};
    },
    token2() {
      return this.contract[CONTRACT.TOKEN.DENOM.TOKEN_2] || {};
    },
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
