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
      <TheHeaderContent :title="$t('titles.blocks')" />
      <BlocksViewListContentTop v-on:searching-blocks="onSearchingBlocks" />
      <BlocksViewListTable />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewListTable from './list/BlocksViewListTable.vue';
import BlocksViewListContentTop from './list/BlocksViewListContentTop.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { CONFIG } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksViewList',
  components: {
    BlocksViewListTable,
    BlocksViewListContentTop,
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
  },
  data: () => ({
    isSearching: false,
  }),
  computed: {
    ...mapGetters('application', {
      lastBlock: 'latestBlock',
    }),
    ...mapGetters('blocks', {
      error: 'error',
      isLoading: 'isLoading',
      newHeight: 'newHeight',
    }),
    firstHeight() {
      return parseInt(CONFIG.FIRST_HEIGHT);
    },
    lastHeight() {
      return this.lastBlock.header.height;
    },
  },
  watch: {
    newHeight(value) {
      if (value && !this.isSearching) this.addBlocksItem(value);
    },
  },
  methods: {
    ...mapActions('blocks', {
      addBlocksItem: 'addBlocksItem',
      initBlocksList: 'initBlocksList',
      searchBlocks: 'searchBlocks',
    }),
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
  created() {
    this.initBlocksList(this.lastHeight);
  },
};
</script>
