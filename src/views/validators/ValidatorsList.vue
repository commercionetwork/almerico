<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.validators')" />
      <ValidatorsListTopContentComponent />
      <ValidatorsListTableComponent />
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import ValidatorsListTableComponent from './list/ValidatorsListTableComponent.vue';
import ValidatorsListTopContentComponent from './list/ValidatorsListTopContentComponent.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsList',
  components: {
    HeaderComponent,
    LoadingLinearComponent,
    ValidatorsListTableComponent,
    ValidatorsListTopContentComponent,
  },
  computed: {
    ...mapGetters('validators', {
      isLoading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions('validators', {
      initValidatorsList: 'initValidatorsList',
    }),
  },
  created() {
    this.initValidatorsList();
  },
};
</script>
