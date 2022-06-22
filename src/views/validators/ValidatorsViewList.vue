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
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import ValidatorsViewListContentTop from './list/ValidatorsViewListContentTop.vue';
import ValidatorsViewListTable from './list/ValidatorsViewListTable.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewList',
  components: {
    BaseLoadingLinear,
    TheErrorMessage,
    TheHeaderContent,
    ValidatorsViewListContentTop,
    ValidatorsViewListTable,
  },
  computed: {
    ...mapGetters('application', ['eventHeight']),
    ...mapGetters('validators', ['error', 'isLoading']),
  },
  watch: {
    eventHeight(value) {
      if (value) this.fetchList();
    },
  },
  created() {
    this.initValidatorsList();
  },
  methods: {
    ...mapActions('validators', ['initValidatorsList', 'fetchList']),
  },
};
</script>
