<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent
        :title="$t('titles.dashboard')"
        :has-optional-content="true"
      >
        <TheChainChooser />
      </TheHeaderContent>
      <HomeViewContentTop />
      <HomeViewBanner />
      <HomeViewGridList />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import HomeViewBanner from './HomeViewBanner';
import HomeViewContentTop from './HomeViewContentTop';
import HomeViewGridList from './HomeViewGridList';
import TheChainChooser from '@/components/TheChainChooser';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    BaseLoadingLinear,
    HomeViewBanner,
    HomeViewContentTop,
    HomeViewGridList,
    TheChainChooser,
    TheErrorMessage,
    TheHeaderContent,
  },
  computed: {
    ...mapGetters('application', ['eventHeight']),
    ...mapGetters('home', [
      'error',
      'isLoading',
      'setParamsEventHeight',
      'txEventHeight',
    ]),
  },
  watch: {
    eventHeight(value) {
      if (value.hasTxs) this.fetchTokensChart();
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
