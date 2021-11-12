<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
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
    HeaderComponent,
    HomeBannerComponent,
    HomeGridListComponent,
    HomeTopContentComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('home', {
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('home', {
      initHome: 'initHome',
    }),
  },
  created() {
    this.initHome();
  },
};
</script>
