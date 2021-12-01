<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <LoadingLinearComponent :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <ErrorMessageComponent :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <HeaderComponent
        :title="$t('titles.dashboard')"
        :hasOptionalContent="true"
      >
        <ChainChooserComponent />
      </HeaderComponent>
      <HomeTopContentComponent />
      <HomeBannerComponent />
      <HomeGridListComponent />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import ChainChooserComponent from '@/components/ChainChooserComponent';
import HeaderComponent from '@/components/HeaderComponent';
import HomeBannerComponent from './HomeBannerComponent';
import HomeGridListComponent from './HomeGridListComponent';
import HomeTopContentComponent from './HomeTopContentComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    ChainChooserComponent,
    ErrorMessageComponent,
    HeaderComponent,
    HomeBannerComponent,
    HomeGridListComponent,
    HomeTopContentComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('home', {
      error: 'error',
      isLoading: 'isLoading',
      txEventHeight: 'txEventHeight',
    }),
  },
  watch: {
    txEventHeight(value) {
      if (value) this.refreshTransactions();
    },
  },
  methods: {
    ...mapActions('home', {
      initHome: 'initHome',
      refreshTransactions: 'refreshTransactions',
    }),
  },
  created() {
    this.initHome();
  },
};
</script>
