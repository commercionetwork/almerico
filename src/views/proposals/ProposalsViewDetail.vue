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
      <TheHeaderContent :title="$t('titles.proposalDetail')" />
      <v-row>
        <v-col cols="12" md="6"><ProposalsViewDetailData /></v-col>
        <v-col cols="12" md="6"><ProposalsViewDetailChart /></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear.vue';
import ProposalsViewDetailChart from './detail/ProposalsViewDetailChart.vue';
import ProposalsViewDetailData from './detail/ProposalsViewDetailData.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetail',
  components: {
    BaseLoadingLinear,
    ProposalsViewDetailChart,
    ProposalsViewDetailData,
    TheErrorMessage,
    TheHeaderContent,
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
