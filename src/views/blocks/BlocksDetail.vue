<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.blockDetail')" />
      <BlocksDetailContentComponent />
    </v-col>
  </v-row>
</template>

<script>
import BlocksDetailContentComponent from './detail/BlocksDetailContentComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlocksDetail',
  components: {
    BlocksDetailContentComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('blocks', {
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
