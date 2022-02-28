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
      <TheHeaderContent :title="$t('titles.validators')" />
      <ValidatorsViewListContentTop />
      <ValidatorsViewListTable />
    </v-col>
  </v-row>
</template>

<script>
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import ValidatorsViewListTable from './list/ValidatorsViewListTable.vue';
import ValidatorsViewListContentTop from './list/ValidatorsViewListContentTop.vue';

import { VALIDATORS } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewList',
  components: {
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
    ValidatorsViewListTable,
    ValidatorsViewListContentTop,
  },
  computed: {
    ...mapGetters('application', {
      latestBlock: 'latestBlock',
    }),
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      newHeight: 'newHeight',
    }),
    lastHeight() {
      return this.latestBlock.header.height;
    },
  },
  watch: {
    newHeight(value) {
      if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY && value)
        this.addBlocksItem(value);
    },
  },
  methods: {
    ...mapActions('validators', {
      addBlocksItem: 'addBlocksItem',
      initValidatorsList: 'initValidatorsList',
    }),
  },
  created() {
    this.initValidatorsList(this.lastHeight);
  },
};
</script>
