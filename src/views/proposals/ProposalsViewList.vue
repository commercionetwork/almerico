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
      <the-header-content :title="$t('titles.governance')" />
      <proposals-view-list-content-top />
      <proposals-view-list-content-bottom />
    </v-col>
  </v-row>
</template>

<script>
import ProposalsViewListContentBottom from './list/ProposalsViewListContentBottom.vue';
import ProposalsViewListContentTop from './list/ProposalsViewListContentTop.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewList',
  components: {
    ProposalsViewListContentBottom,
    ProposalsViewListContentTop,
  },
  computed: {
    ...mapGetters('proposals', ['error', 'isLoading', 'filter']),
  },
  watch: {
    filter(status) {
      this.fetchProposals(status);
    },
  },
  created() {
    this.initProposalsList();
  },
  methods: {
    ...mapActions('proposals', ['initProposalsList', 'fetchProposals']),
  },
};
</script>
