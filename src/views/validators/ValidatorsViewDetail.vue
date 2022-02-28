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
      <TheHeaderContent :title="$t('titles.validatorDetail')" />
      <ValidatorsViewDetailContentTop :account="account" />
      <ValidatorsViewDetailContentBody :account="account" />
    </v-col>
  </v-row>
  <v-row v-else data-test="warning">
    <v-col cols="12">
      <TheAlertNotice kind="warning" :message="$t('msgs.validatorNotExist')" />
    </v-col>
  </v-row>
</template>

<script>
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import ValidatorsViewDetailContentBody from './detail/ValidatorsViewDetailContentBody.vue';
import ValidatorsViewDetailContentTop from './detail/ValidatorsViewDetailContentTop.vue';

import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetail',
  components: {
    TheAlertNotice,
    TheErrorMessage,
    TheHeaderContent,
    BaseLoadingLinear,
    ValidatorsViewDetailContentBody,
    ValidatorsViewDetailContentTop,
  },
  data: () => ({
    isValid: true,
    account: '',
  }),
  computed: {
    ...mapGetters('application', {
      latestBlock: 'latestBlock',
    }),
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      newHeight: 'newHeight',
    }),
    address() {
      return this.$route.params.id;
    },
    lastHeight() {
      return this.latestBlock.header.height;
    },
  },
  watch: {
    address(value) {
      this.getAccount();
      if (this.isValid)
        this.initValidatorsDetail({ id: value, lastHeight: this.lastHeight });
    },
    newHeight(value) {
      if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY && value)
        this.addBlocksItem(value);
    },
  },
  methods: {
    ...mapActions('validators', {
      addBlocksItem: 'addBlocksItem',
      initValidatorsDetail: 'initValidatorsDetail',
    }),
    getAccount() {
      try {
        const hex = bech32Manager.decode(this.address);
        this.account = bech32Manager.encode(
          hex,
          CONFIG.PREFIXES.ACCOUNT.ADDRESS
        );
      } catch (error) {
        this.isValid = false;
      }
    },
  },
  created() {
    this.getAccount();
    if (this.isValid) {
      this.initValidatorsDetail({
        id: this.address,
        lastHeight: this.lastHeight,
      });
    }
  },
};
</script>
