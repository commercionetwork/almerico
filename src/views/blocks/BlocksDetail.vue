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
      <HeaderComponent :title="$t('titles.blockDetail')" />
      <BlocksDetailContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksDetailContentComponent from './detail/BlocksDetailContentComponent.vue';
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksDetail',
  components: {
    BlocksDetailContentComponent,
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('blocks', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    height() {
      return this.$route.params.id;
    },
  },
  watch: {
    height(value) {
      if (value) this.initBlocksDetail(value);
    },
  },
  methods: {
    ...mapActions('blocks', {
      initBlocksDetail: 'initBlocksDetail',
    }),
  },
  created() {
    this.initBlocksDetail(this.height);
  },
};
</script>
