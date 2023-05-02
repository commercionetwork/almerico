<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <base-loading-linear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <the-error-message :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <the-header-content :title="$t('titles.validatorDetail')" />
      <validators-view-detail-content-top />
      <validators-view-detail-content-bottom />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsViewDetailContentBottom from './detail/ValidatorsViewDetailContentBottom.vue';
import ValidatorsViewDetailContentTop from './detail/ValidatorsViewDetailContentTop.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetail',
  components: {
    ValidatorsViewDetailContentBottom,
    ValidatorsViewDetailContentTop,
  },
  props: {
    id: {
      type: String,
      note: "The validator id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('application', ['eventHeight']),
    ...mapGetters('validators', ['error', 'isLoading']),
  },
  watch: {
    id(value) {
      this.initValidatorsDetail(value);
    },
    eventHeight() {
      this.updateValidatorsDetail(this.id);
    },
  },
  created() {
    this.initValidatorsDetail(this.id);
  },
  methods: {
    ...mapActions('validators', [
      'initValidatorsDetail',
      'updateValidatorsDetail',
    ]),
  },
};
</script>
