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
      <the-header-content :title="$t('titles.blockDetail')" />
      <blocks-view-detail-countdown
        v-if="isFutureHeight"
        data-test="countdown"
      />
      <blocks-view-detail-content v-else data-test="block-detail" />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewDetailContent from './detail/BlocksViewDetailContent.vue';
import BlocksViewDetailCountdown from './detail/BlocksViewDetailCountdown.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetail',
  components: {
    BlocksViewDetailCountdown,
    BlocksViewDetailContent,
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
