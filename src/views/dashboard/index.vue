<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        indeterminate
        rounded
        color="primary"
        height="25"
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else-if="!isLoading && error" data-test="error">
    <v-col cols="12">
      <v-alert border="left" prominent text type="error">
        <span class="text-body-1" v-text="JSON.stringify(error)" />
      </v-alert>
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <DashboardHeader />
      <DashboardTopBody class="py-1" />
      <DashboardBanner class="py-1" />
      <DashboardMiddleBody class="py-1" />
    </v-col>
  </v-row>
</template>

<script>
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import DashboardMiddleBody from './DashboardMiddleBody';
import DashboardTopBody from './DashboardTopBody';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    DashboardBanner,
    DashboardHeader,
    DashboardMiddleBody,
    DashboardTopBody,
  },
  computed: {
    ...mapGetters(['error']),
    ...mapGetters('dashboard', {
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('dashboard', {
      init: 'init',
    }),
  },
  created() {
    this.init();
  },
};
</script>
