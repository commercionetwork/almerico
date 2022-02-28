<template>
  <v-row v-if="isValid">
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
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
  <v-row v-else data-test="warning">
    <v-col cols="12">
      <AlertComponent kind="warning" :message="$t('msgs.accountNotExist')" />
    </v-col>
  </v-row>
</template>

<script>
import AccountBottomComponent from './AccountBottomComponent.vue';
import AccountMiddleComponent from './AccountMiddleComponent.vue';
import AccountTopComponent from './AccountTopComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';

import { CONFIG } from '@/constants';
import { bech32Manager } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Account',
  components: {
    AccountBottomComponent,
    AccountMiddleComponent,
    AccountTopComponent,
    AlertComponent,
    ErrorMessageComponent,
    HeaderComponent,
    BaseLoadingLinear,
  },
  data: () => ({
    isValid: true,
    validator: '',
  }),
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
      this.getValidator();
      if (this.isValid)
        this.initAccount({ address: value, validator: this.validator });
    },
  },
  methods: {
    ...mapActions('account', {
      initAccount: 'initAccount',
    }),
    getValidator() {
      try {
        const hex = bech32Manager.decode(this.address);
        this.validator = bech32Manager.encode(
          hex,
          CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS
        );
      } catch (error) {
        this.isValid = false;
      }
    },
  },
  created() {
    this.getValidator();
    if (this.isValid) {
      this.initAccount({ address: this.address, validator: this.validator });
    }
  },
};
</script>
