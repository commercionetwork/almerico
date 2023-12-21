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
          <pools-view-swap-form @complete="onComplete" @invalid="onInvalid" />
        </template>
        <template #bottom-content>
          <pools-view-swap-execute :model="model" @success="onSuccess" />
        </template>
      </base-small-window>
    </v-col>
  </v-row>
</template>

<script>
import PoolsViewSwapExecute from './detail/swap/PoolsViewSwapExecute.vue';
import PoolsViewSwapForm from './detail/swap/PoolsViewSwapForm.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PoolsViewDetailSwap',
  components: {
    PoolsViewSwapExecute,
    PoolsViewSwapForm,
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
      model: null,
    };
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
    onComplete(model) {
      this.model = model;
    },
    onInvalid() {
      this.model = null;
    },
    onSuccess() {
      this.initPoolsDetail(this.id);
    },
  },
};
</script>
