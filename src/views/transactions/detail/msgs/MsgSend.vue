<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.fromAddress')"
        :content="fromAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: fromAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.toAddress')"
        :content="toAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: toAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, i) in amounts" :key="i">
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
  name: 'MsgSend',
  description: 'Display a send transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    fromAddress() {
      return this.message.from_address;
    },
    toAddress() {
      return this.message.to_address;
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
