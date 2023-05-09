<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-item :label="$t('labels.uuid')" :content="uuid" />
      <base-detail-link
        :label="$t('labels.sender')"
        :content="senderAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: senderAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.recipient')"
        :content="recipientAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipientAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.txHash')"
        :content="txHash"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.documentUUID')"
        :content="documentUuid"
      />
      <base-detail-item :label="$t('labels.proof')" :content="proof" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send document message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    uuid() {
      return this.message.UUID || '-';
    },
    senderAddress() {
      return this.message.sender || '-';
    },
    recipientAddress() {
      return this.message.recipient || '-';
    },
    txHash() {
      return this.message.txHash || '-';
    },
    documentUuid() {
      return this.message.DocumentUUID || '-';
    },
    proof() {
      return this.message.proof || '-';
    },
  },
};
</script>
