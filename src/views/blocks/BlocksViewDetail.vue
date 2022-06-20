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
      <BlocksViewDetailCountdown v-if="isFutureHeight" data-test="countdown" />
      <BlocksViewDetailContent v-else data-test="block-detail" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import BlocksViewDetailContent from './detail/BlocksViewDetailContent.vue';
import BlocksViewDetailCountdown from './detail/BlocksViewDetailCountdown.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetail',
  components: {
    BaseLoadingLinear,
    BlocksViewDetailCountdown,
    BlocksViewDetailContent,
    TheErrorMessage,
    TheHeaderContent,
  },
  props: {
    id: {
      type: String,
      note: "The block's id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('application', ['latestBlock']),
    ...mapGetters('blocks', ['error', 'isLoading']),
    isFutureHeight() {
      return parseInt(this.id) > parseInt(this.latestBlock.header.height);
    },
  },
  watch: {
    id() {
      this.init();
    },
    isFutureHeight(value) {
      if (!value) this.initBlocksDetail(this.id);
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('blocks', ['initBlocksDetail', 'initBlockCountdown']),
    init() {
      this.isFutureHeight
        ? this.initBlockCountdown(this.id)
        : this.initBlocksDetail(this.id);
    },
  },
};
</script>
