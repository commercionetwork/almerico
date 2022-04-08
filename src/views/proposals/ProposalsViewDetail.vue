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
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetail',
  components: {
    BaseLoadingLinear,
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
  mounted() {
    this.initProposalsDetail(this.id);
  },
  methods: {
    ...mapActions('proposals', ['initProposalsDetail']),
  },
};
</script>
