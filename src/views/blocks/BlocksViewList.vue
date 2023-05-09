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
      <the-header-content :title="$t('titles.blocks')" />
      <blocks-view-list-content-top @searching-blocks="onSearchingBlocks" />
      <blocks-view-list-table />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewListTable from './list/BlocksViewListTable.vue';
import BlocksViewListContentTop from './list/BlocksViewListContentTop.vue';

import { CONFIG } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksViewList',
  components: {
    BlocksViewListContentTop,
    BlocksViewListTable,
  },
  data() {
    return {
      isSearching: false,
    };
  },
  computed: {
    ...mapGetters('application', ['latestBlock']),
    ...mapGetters('blocks', ['error', 'isLoading', 'newHeight']),
    firstHeight() {
      return parseInt(CONFIG.FIRST_HEIGHT);
    },
    lastHeight() {
      return this.latestBlock.header.height;
    },
  },
  watch: {
    newHeight(value) {
      if (value && !this.isSearching) this.addBlocksItem(value);
    },
  },
  created() {
    this.initBlocksList(this.lastHeight);
  },
  methods: {
    ...mapActions('blocks', [
      'addBlocksItem',
      'initBlocksList',
      'searchBlocks',
    ]),
    onSearchingBlocks(height) {
      if (!height) {
        this.isSearching = false;
        this.initBlocksList(this.lastHeight);
      } else if (
        !isNaN(height) &&
        height <= this.lastHeight &&
        height >= this.firstHeight
      ) {
        this.isSearching = true;
        this.searchBlocks(height);
      } else {
        return;
      }
    },
  },
};
</script>
