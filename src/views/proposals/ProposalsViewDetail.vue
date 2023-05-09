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
      <the-header-content :title="$t('titles.proposalDetail')" />
      <v-row>
        <v-col cols="12" lg="6">
          <proposals-view-detail-data />
        </v-col>
        <v-col cols="12" lg="6">
          <proposals-view-detail-votes />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ProposalsViewDetailData from './detail/ProposalsViewDetailData.vue';
import ProposalsViewDetailVotes from './detail/ProposalsViewDetailVotes.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetail',
  components: {
    ProposalsViewDetailData,
    ProposalsViewDetailVotes,
  },
  props: {
    id: {
      type: String,
      note: "The proposal's id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('proposals', ['error', 'isLoading']),
  },
  watch: {
    id(value) {
      if (value) this.initProposalsDetail(value);
    },
  },
  created() {
    this.initProposalsDetail(this.id);
  },
  methods: {
    ...mapActions('proposals', ['initProposalsDetail']),
  },
};
</script>
