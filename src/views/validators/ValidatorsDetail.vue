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
      <HeaderComponent :title="$t('titles.validatorDetail')" />
      <ValidatorsDetailTopContentComponent :account="account" />
      <ValidatorsDetailBodyContentComponent :account="account" />
    </v-col>
  </v-row>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';
import ValidatorsDetailBodyContentComponent from './detail/ValidatorsDetailBodyContentComponent.vue';
import ValidatorsDetailTopContentComponent from './detail/ValidatorsDetailTopContentComponent.vue';

import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager } from '@/utils';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetail',
  components: {
    ErrorMessageComponent,
    HeaderComponent,
    LoadingLinearComponent,
    ValidatorsDetailBodyContentComponent,
    ValidatorsDetailTopContentComponent,
  },
  computed: {
    ...mapGetters('application', {
      latestBlock: 'latestBlock',
    }),
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      newHeight: 'newHeight',
    }),
    account() {
      const hex = bech32Manager.decode(this.address);
      return bech32Manager.encode(hex, CONFIG.PREFIXES.ACCOUNT.ADDRESS);
    },
    address() {
      return this.$route.params.id;
    },
    lastHeight() {
      return this.latestBlock.header.height;
    },
  },
  watch: {
    address(value) {
      if (value)
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
  },
  created() {
    this.initValidatorsDetail({
      id: this.address,
      lastHeight: this.lastHeight,
    });
  },
};
</script>
