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
      <the-header-content :title="$t('titles.poolsDetail')" />
      <pools-view-detail-contract />
    </v-col>
  </v-row>
</template>

<script>
import PoolsViewDetailContract from './detail/dashboard/PoolsViewDetailContract.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PoolsViewDetailDashboard',
  components: { PoolsViewDetailContract },
  props: {
    id: {
      type: String,
      required: true,
      note: 'The contract address',
    },
  },
  computed: {
    ...mapGetters('poolsDetail', ['error', 'isLoading', 'hasWallet']),
    ...mapGetters('keplr', ['accounts']),
  },
  watch: {
    accounts(newValue) {
      if (newValue) {
        this.initPoolsDetail(this.id);
      }
    },
  },
  created() {
    this.initPoolsDetail(this.id);
  },
  methods: {
    ...mapActions('poolsDetail', ['initPoolsDetail']),
  },
};
</script>
