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
      <ValidatorsViewDetailContentBottom :account="account" />
    </v-col>
  </v-row>
  <v-row v-else data-test="warning">
    <v-col cols="12">
      <TheAlertNotice kind="warning" :message="$t('msgs.validatorNotExist')" />
    </v-col>
  </v-row>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent';
import ValidatorsViewDetailContentBottom from './detail/ValidatorsViewDetailContentBottom.vue';
import ValidatorsViewDetailContentTop from './detail/ValidatorsViewDetailContentTop.vue';

import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetail',
  components: {
    BaseLoadingLinear,
    TheAlertNotice,
    TheErrorMessage,
    TheHeaderContent,
    ValidatorsViewDetailContentBottom,
    ValidatorsViewDetailContentTop,
  },
  props: {
    id: {
      type: String,
      note: "The validator id passed by router's parameter",
    },
  },
  data: () => ({
    isValid: true,
    account: '',
  }),
  computed: {
    ...mapGetters('application', ['latestBlock']),
    ...mapGetters('validators', ['error', 'isLoading', 'newHeight']),
    lastHeight() {
      return this.latestBlock.header.height;
    },
  },
  watch: {
    id(value) {
      this.getAccount(value);
      if (this.isValid)
        this.initValidatorsDetail({ id: value, lastHeight: this.lastHeight });
    },
    newHeight(value) {
      if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY && value)
        this.updateBlocksMonitor(value);
    },
  },
  created() {
    this.getAccount(this.id);
    if (this.isValid) {
      this.initValidatorsDetail({
        id: this.id,
        lastHeight: this.lastHeight,
      });
    }
  },
  methods: {
    ...mapActions('validators', [
      'initValidatorsDetail',
      'updateBlocksMonitor',
    ]),
    getAccount(address) {
      try {
        const hex = bech32Manager.decode(address);
        this.account = bech32Manager.encode(
          hex,
          CONFIG.PREFIXES.ACCOUNT.ADDRESS
        );
      } catch (error) {
        this.isValid = false;
      }
    },
  },
};
</script>
