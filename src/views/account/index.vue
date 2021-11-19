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
      <HeaderComponent :title="$t('titles.accountDetail')" />
      <AccountTopComponent />
      <AccountMiddleComponent />
      <AccountBottomComponent />
    </v-col>
  </v-row>
</template>

<script>
import AccountBottomComponent from './AccountBottomComponent.vue';
import AccountMiddleComponent from './AccountMiddleComponent.vue';
import AccountTopComponent from './AccountTopComponent.vue';
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Account',
  components: {
    AccountBottomComponent,
    AccountMiddleComponent,
    AccountTopComponent,
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('account', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    address() {
      return this.$route.params.id;
    },
  },
  watch: {
    address(value) {
      if (value) this.initAccount(value);
    },
  },
  methods: {
    ...mapActions('account', {
      initAccount: 'initAccount',
    }),
  },
  created() {
    this.initAccount(this.address);
  },
};
</script>
