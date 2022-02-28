<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.depositor')"
        :content="depositorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: depositorAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <BaseDetailItem
          :label="$t('labels.amount')"
          :content="amount"
          :is-loop="true"
          look="text-uppercase"
        />
      </v-list-item>
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgDepositIntoLiquidityPool',
  description: 'Display a deposit into liquidity pool transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a deposit message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    depositorAddress() {
      return this.message.depositor;
    },
    amounts() {
      return this.message.amount.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        })
      );
    },
  },
};
</script>
