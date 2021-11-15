<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.blocks')" />
      <BlocksListTopContentComponent />
      <BlocksListTableComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksListTableComponent from './list/BlocksListTableComponent.vue';
import BlocksListTopContentComponent from './list/BlocksListTopContentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksList',
  components: {
    BlocksListTableComponent,
    BlocksListTopContentComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('application', {
      lastBlock: 'latestBlock',
    }),
    ...mapGetters('blocks', {
      isLoading: 'isLoading',
      newHeight: 'newHeight',
    }),
    lastHeight() {
      return this.lastBlock.header.height;
    },
  },
  watch: {
    newHeight(value) {
      if (value) this.addBlocksItem(value);
    },
  },
  methods: {
    ...mapActions('blocks', {
      initBlocksList: 'initBlocksList',
      addBlocksItem: 'addBlocksItem',
    }),
  },
  created() {
    this.initBlocksList(this.lastHeight);
  },
};
</script>
