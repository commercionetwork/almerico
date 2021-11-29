<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailItemComponent :label="$t('labels.uuid')" :content="uuid" />
      <DetailLinkComponent
        :label="$t('labels.sender')"
        :content="senderAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: senderAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.recipient')"
        :content="recipientAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipientAddress },
        }"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.txHash')"
        :content="txHash"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.documentUUID')"
        :content="documentUuid"
      />
      <DetailItemComponent :label="$t('labels.proof')" :content="proof" />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send document message',
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
    uuid() {
      return this.message.uuid || '-';
    },
    senderAddress() {
      return this.message.sender || '-';
    },
    recipientAddress() {
      return this.message.recipient || '-';
    },
    txHash() {
      return this.message.tx_hash || '-';
    },
    documentUuid() {
      return this.message.document_uuid || '-';
    },
    proof() {
      return this.message.proof || '-';
    },
  },
};
</script>
