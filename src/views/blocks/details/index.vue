<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        indeterminate
        rounded
        color="primary"
        height="25"
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <BlockDetailsHeader />
      <v-row v-if="error !== null">
        <v-col cols="12" v-if="error.status === 404" data-test="not-found">
          <v-alert border="left" prominent text type="info">
            <span class="text-body-1" v-text="infoMessage" />
          </v-alert>
        </v-col>
        <v-col cols="12" v-else data-test="error">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <BlockDetailsTopBody
        v-else
        class="py-1"
        :height="height"
        data-test="content"
      />
    </v-col>
  </v-row>
</template>

<script>
import BlockDetailsHeader from './BlockDetailsHeader';
import BlockDetailsTopBody from './BlockDetailsTopBody';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlockDetails',
  components: {
    BlockDetailsHeader,
    BlockDetailsTopBody,
  },
  computed: {
    ...mapGetters('blocks', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    height() {
      return this.$route.params.id;
    },
    infoMessage() {
      return 'No blocks at this height';
    },
  },
  watch: {
    $route(to) {
      this.getBlock(to.params.id);
    },
  },
  methods: {
    ...mapActions('blocks', {
      getBlock: 'getBlock',
    }),
  },
  created() {
    if (this.height) this.getBlock(this.height);
  },
};
</script>
