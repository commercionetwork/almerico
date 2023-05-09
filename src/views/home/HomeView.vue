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
      <the-header-content
        :title="$t('titles.dashboard')"
        :has-optional-content="true"
      >
        <the-chain-chooser />
      </the-header-content>
      <home-view-content-top />
      <home-view-banner />
      <home-view-grid-list />
    </v-col>
  </v-row>
</template>

<script>
import HomeViewBanner from './HomeViewBanner';
import HomeViewContentTop from './HomeViewContentTop';
import HomeViewGridList from './HomeViewGridList';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    HomeViewBanner,
    HomeViewContentTop,
    HomeViewGridList,
  },
  computed: {
    ...mapGetters('home', [
      'error',
      'isLoading',
      'setParamsEventHeight',
      'txEventHeight',
      'chartEventTokens',
    ]),
  },
  watch: {
    chartEventTokens() {
      this.fetchTokensChart();
    },
    setParamsEventHeight() {
      this.refreshParams();
    },
    txEventHeight() {
      this.refreshTransactions();
    },
  },
  created() {
    this.initHome();
  },
  methods: {
    ...mapActions('home', [
      'initHome',
      'refreshParams',
      'refreshTransactions',
      'fetchTokensChart',
    ]),
  },
};
</script>
