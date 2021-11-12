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

import { CONFIG } from '@/constants';
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
    ...mapGetters('validators', {
      isLoading: 'isLoading',
    }),
    account() {
      const hex = bech32Manager.decode(this.address);
      return bech32Manager.encode(hex, CONFIG.PREFIXES.ACCOUNT.ADDRESS);
    },
    address() {
      return this.$route.params.id;
    },
  },
  watch: {
    address(value) {
      if (value) this.initValidatorsDetail(value);
    },
  },
  methods: {
    ...mapActions('validators', {
      initValidatorsDetail: 'initValidatorsDetail',
    }),
  },
  created() {
    this.initValidatorsDetail(this.address);
  },
};
</script>
