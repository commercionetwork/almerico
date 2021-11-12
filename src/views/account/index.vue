<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
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
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Account',
  components: {
    AccountBottomComponent,
    AccountMiddleComponent,
    AccountTopComponent,
    HeaderComponent,
    LoadingLinearComponent,
  },
  computed: {
    ...mapGetters('account', {
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
