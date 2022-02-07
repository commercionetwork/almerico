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
      <HeaderComponent :title="$t('titles.validators')" />
      <ValidatorsListTopContentComponent />
      <ValidatorsListTableComponent />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import ValidatorsListTableComponent from './list/ValidatorsListTableComponent.vue';
import ValidatorsListTopContentComponent from './list/ValidatorsListTopContentComponent.vue';

import { VALIDATORS } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsList',
  components: {
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
    ValidatorsListTableComponent,
    ValidatorsListTopContentComponent,
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
