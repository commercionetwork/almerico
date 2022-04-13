<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailItem :label="$t('labels.uuid')" :content="uuid" />
      <BaseDetailLink
        :label="$t('labels.sender')"
        :content="senderAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: senderAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.recipient')"
        :content="recipientAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipientAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.txHash')"
        :content="txHash"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.documentUUID')"
        :content="documentUuid"
      />
      <BaseDetailItem :label="$t('labels.proof')" :content="proof" />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
