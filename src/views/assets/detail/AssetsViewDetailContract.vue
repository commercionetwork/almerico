<template>
  <v-card outlined>
    <v-card-title>
      <span v-text="$t('titles.contractDetail')" />
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
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewDetailContract',
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    ...mapGetters('assets', ['detail']),
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
