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
      <TheHeaderContent :title="$t('titles.governance')" />
      <ProposalsViewListContentTop />
      <ProposalsViewListContentBottom />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import ProposalsViewListContentBottom from './list/ProposalsViewListContentBottom.vue';
import ProposalsViewListContentTop from './list/ProposalsViewListContentTop.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewList',
  components: {
    BaseLoadingLinear,
    ProposalsViewListContentBottom,
    ProposalsViewListContentTop,
    TheErrorMessage,
    TheHeaderContent,
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
