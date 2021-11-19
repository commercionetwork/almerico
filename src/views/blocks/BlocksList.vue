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
      <BlocksListTopContentComponent />
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
