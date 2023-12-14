<template>
  <dex-detail-data-card :subtitle="title">
    <template #data-1>
      <span class="font-weight-bold" v-text="$t('labels.denom')" />
      <span>:</span>
      <span class="ml-1 text-capitalize" v-text="token.denom" />
    </template>
    <template #data-2>
      <span class="font-weight-bold" v-text="$t('labels.type')" />
      <span>:</span>
      <span class="ml-1" v-text="token.type" />
    </template>
    <template #data-3>
      <span class="font-weight-bold" v-text="$t('labels.reserve')" />
      <span>:</span>
      <span class="ml-1" v-text="formatAmount(token.reserve, token.decimals)" />
    </template>
    <template #data-4>
      <span class="font-weight-bold" v-text="$t('labels.balance')" />
      <span>:</span>
      <span class="ml-1" v-text="formatAmount(token.balance, token.decimals)" />
    </template>
  </dex-detail-data-card>
</template>

<script>
import DexDetailDataCard from './DexDetailDataCard.vue';

import { mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexDetailToken',
  components: {
    DexDetailDataCard,
  },
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
    ...mapGetters('dexManagement', ['contract']),
  },
  methods: {
    formatAmount(amount, decimals) {
      const amountToFormat = tokensHandler.convertFromBase(amount, decimals);
      return tokensHandler.format(amountToFormat, decimals);
    },
  },
};
</script>
