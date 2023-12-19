<template>
  <v-card-text class="ml-3">
    <v-card-subtitle>
      <div class="font-weight-bold" v-text="title" />
    </v-card-subtitle>
    <v-list dense>
      <base-detail-item
        :label="$t('labels.denom')"
        :content="token.denom"
      ></base-detail-item>
      <base-detail-item
        :label="$t('labels.type')"
        :content="token.type"
      ></base-detail-item>
      <base-detail-item
        :label="$t('labels.reserve')"
        :content="reserve"
      ></base-detail-item>
      <base-detail-item
        :label="$t('labels.balance')"
        :content="balance"
      ></base-detail-item>
    </v-list>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'PoolsViewDetailToken',
  props: {
    title: {
      type: String,
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('poolsManagement', ['contract']),
    balance() {
      return this.formatAmount(this.token.balance, this.token.decimals);
    },
    reserve() {
      return this.formatAmount(this.token.reserve, this.token.decimals);
    },
  },
  methods: {
    formatAmount(amount, decimals) {
      const amountToFormat = tokensHandler.convertFromBase(amount, decimals);
      return tokensHandler.format(amountToFormat, decimals);
    },
  },
};
</script>
