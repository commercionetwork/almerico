<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.depositor')"
        :content="depositorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: depositorAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <DetailItemComponent
          :label="$t('labels.amount')"
          :content="amount"
          :isLoop="true"
          look="text-uppercase"
        />
      </v-list-item>
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgDepositIntoLiquidityPool',
  description: 'Display a deposit into liquidity pool transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
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
        }),
      );
    },
  },
};
</script>
