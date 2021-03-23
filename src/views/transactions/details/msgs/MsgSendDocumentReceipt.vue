<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="uuid" :content="uuid" />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="sender"
          :content="senderAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: senderAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="recipient"
          :content="recipientAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: recipientAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItem label="tx hash" :content="txHash" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="document UUID" :content="documentUuid" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="proof" :content="proof" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgLink from '@/components/MsgLink.vue';
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  components: {
    MsgItem,
    MsgLink,
    MsgTx,
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
    documentUuid() {
      return this.message.value.document_uuid
        ? this.message.value.document_uuid
        : '-';
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : '-';
    },
    recipientAddress() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    senderAddress() {
      return this.message.value.sender ? this.message.value.sender : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    txHash() {
      return this.message.value.tx_hash ? this.message.value.tx_hash : '-';
    },
    uuid() {
      return this.message.value.uuid ? this.message.value.uuid : '-';
    },
  },
};
</script>
