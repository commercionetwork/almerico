<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <LoadingLinearComponent :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <ErrorMessageComponent :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <HeaderComponent :title="$t('titles.blocks')" />
      <BlocksListTopContentComponent
        v-on:searching-blocks="onSearchingBlocks"
      />
      <BlocksListTableComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksListTableComponent from './list/BlocksListTableComponent.vue';
import BlocksListTopContentComponent from './list/BlocksListTopContentComponent.vue';
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { SETTINGS } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksList',
  components: {
    BlocksListTableComponent,
    BlocksListTopContentComponent,
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
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
        height >= SETTINGS.FIRST_HEIGHT
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
