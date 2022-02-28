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
      <TheHeaderContent :title="$t('titles.blockDetail')" />
      <BlocksDetailContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksDetailContentComponent from './detail/BlocksDetailContentComponent.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksDetail',
  components: {
    BlocksDetailContentComponent,
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
  },
  computed: {
    ...mapGetters('blocks', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    height() {
      return this.$route.params.id;
    },
  },
  watch: {
    height(value) {
      if (value) this.initBlocksDetail(value);
    },
  },
  methods: {
    ...mapActions('blocks', {
      initBlocksDetail: 'initBlocksDetail',
    }),
  },
  created() {
    this.initBlocksDetail(this.height);
  },
};
</script>
