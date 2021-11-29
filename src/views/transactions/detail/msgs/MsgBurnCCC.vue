<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.signer')"
        :content="signerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signerAddress },
        }"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
      <DetailItemComponent :label="$t('labels.id')" :content="id" />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { coinAdapter, regExpBuilder } from '@/utils';

export default {
  name: 'MsgBurnCCC',
  description: 'Display a burnCCC transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a burnCCC message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getMessageTypeRegExp(),
      )[0];
      return lastSegment.substring(1);
    },
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getMessageSourceRegExp(),
      )[0];
      return firstSegments.substring(1);
    },
    signerAddress() {
      return this.message.signer;
    },
    amount() {
      return coinAdapter.format({
        amount: this.message.amount.amount,
        denom: this.message.amount.denom,
      });
    },
    id() {
      return this.message.ID;
    },
  },
};
</script>
