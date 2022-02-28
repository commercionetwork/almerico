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
        :hasOptionalContent="true"
      >
        <TheChainChooser />
      </TheHeaderContent>
      <HomeTopContentComponent />
      <HomeBannerComponent />
      <HomeGridListComponent />
    </v-col>
  </v-row>
</template>

<script>
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheChainChooser from '@/components/TheChainChooser';
import TheHeaderContent from '@/components/TheHeaderContent';
import HomeBannerComponent from './HomeBannerComponent';
import HomeGridListComponent from './HomeGridListComponent';
import HomeTopContentComponent from './HomeTopContentComponent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    TheChainChooser,
    TheErrorMessage,
    TheHeaderContent,
    HomeBannerComponent,
    HomeGridListComponent,
    HomeTopContentComponent,
    BaseLoadingLinear,
  },
  computed: {
    ...mapGetters('home', {
      error: 'error',
      isLoading: 'isLoading',
      setParamsEventHeight: 'setParamsEventHeight',
      txEventHeight: 'txEventHeight',
    }),
  },
  watch: {
    setParamsEventHeight() {
      this.refreshParams();
    },
    txEventHeight() {
      this.refreshTransactions();
    },
  },
  methods: {
    ...mapActions('home', {
      initHome: 'initHome',
      refreshParams: 'refreshParams',
      refreshTransactions: 'refreshTransactions',
    }),
  },
  created() {
    this.initHome();
  },
};
</script>
