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
      <TheHeaderContent :title="$t('titles.validatorDetail')" />
      <ValidatorsViewDetailContentTop />
      <ValidatorsViewDetailContentBottom />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import ValidatorsViewDetailContentBottom from './detail/ValidatorsViewDetailContentBottom.vue';
import ValidatorsViewDetailContentTop from './detail/ValidatorsViewDetailContentTop.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetail',
  components: {
    BaseLoadingLinear,
    TheErrorMessage,
    TheHeaderContent,
    ValidatorsViewDetailContentBottom,
    ValidatorsViewDetailContentTop,
  },
  provide() {
    return {
      address: this.id,
    };
  },
  props: {
    id: {
      type: String,
      note: "The validator id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('validators', ['error', 'isLoading', 'newUpdate']),
  },
  watch: {
    id(value) {
      this.initValidatorsDetail(value);
    },
    newUpdate() {
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
