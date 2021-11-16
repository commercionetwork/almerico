<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <LoadingLinearComponent :height="25" />
    </v-col>
  </v-row>
  <v-row v-else data-test="content">
    <v-col cols="12">
      <HeaderComponent :title="$t('titles.validatorDetail')" />
      <ValidatorsDetailTopContentComponent :account="account" />
      <v-divider class="my-3" />
      <ValidatorsDetailBodyContentComponent :account="account" />
    </v-col>
  </v-row>
</template>

<script>
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
