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
      <TheErrorMessage :error="error" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.accountDetail')" />
      <AccountViewContentTop />
      <AccountViewContentMiddle />
      <AccountViewContentBottom />
    </v-col>
  </v-row>
  <v-row v-else data-test="warning">
    <v-col cols="12">
      <TheAlertNotice kind="warning" :message="$t('msgs.accountNotExist')" />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewContentBottom from './AccountViewContentBottom.vue';
import AccountViewContentMiddle from './AccountViewContentMiddle.vue';
import AccountViewContentTop from './AccountViewContentTop.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { CONFIG } from '@/constants';
import { bech32Manager } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountView',
  components: {
    AccountViewContentBottom,
    AccountViewContentMiddle,
    AccountViewContentTop,
    BaseLoadingLinear,
    TheAlertNotice,
    TheErrorMessage,
    TheHeaderContent,
  },
  data: () => ({
    isValid: true,
    validator: '',
  }),
  computed: {
    ...mapGetters('account', ['error', 'isLoading']),
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
  created() {
    this.getValidator();
    if (this.isValid) {
      this.initAccount({ address: this.address, validator: this.validator });
    }
  },
  methods: {
    ...mapActions('account', ['initAccount']),
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
};
</script>
