<template>
  <v-card outlined>
    <v-card-title>
      <div v-text="$t('titles.contractDetail')" />
      <v-spacer />
      <v-btn v-if="minter" icon @click="dialog = true">
        <v-icon size="20">{{ mdiPencilPlus }}</v-icon>
      </v-btn>
      <assets-modal-minting v-model="dialog" />
      <v-btn
        icon
        :to="{
          name: ROUTES.NAME.ASSETS_DETAIL_TRANSFER,
          params: { id: detail.id },
        }"
      >
        <v-icon size="20">{{ mdiSend }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider class="mx-3" />
    <v-card-text>
      <v-list dense>
        <base-detail-item
          :label="$t('labels.name')"
          :content="token.name"
        ></base-detail-item>
        <base-detail-item
          :label="$t('labels.symbol')"
          :content="token.symbol"
        ></base-detail-item>
        <base-detail-item
          :label="$t('labels.decimals')"
          :content="token.decimals"
        ></base-detail-item>
        <base-detail-item
          :label="$t('labels.supply')"
          :content="supply"
        ></base-detail-item>
        <base-detail-link
          :label="$t('labels.minter')"
          :content="minter.minter"
          :route="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: minter.minter },
          }"
        ></base-detail-link>
        <base-detail-item
          :label="$t('labels.cap')"
          :content="minterCap"
        ></base-detail-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import AssetsModalMinting from './minting/AssetsModalMinting.vue';

import { mdiPencilPlus, mdiSend } from '@mdi/js';
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewDetailContract',
  components: {
    AssetsModalMinting,
  },
  data() {
    return {
      ROUTES,
      mdiPencilPlus,
      mdiSend,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('assetsDetail', ['detail']),
    minter() {
      return this.detail && this.detail.minter ? this.detail.minter : null;
    },
    minterCap() {
      return this.token && this.minter && this.minter.cap
        ? this.formatToken(this.minter.cap, this.token.decimals)
        : '-';
    },
    token() {
      return this.detail && this.detail.token ? this.detail.token : null;
    },
    supply() {
      return this.token && this.token.total_supply
        ? this.formatToken(this.token.total_supply, this.token.decimals)
        : '0';
    },
  },
  methods: {
    formatToken(token, decimals) {
      const amount = tokensHandler.convertFromBase(token, decimals);
      return tokensHandler.format(amount, decimals);
    },
  },
};
</script>
