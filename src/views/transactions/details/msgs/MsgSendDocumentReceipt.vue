<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItemComponent label="uuid" :content="uuid" />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="sender"
          :content="senderAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: senderAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="recipient"
          :content="recipientAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: recipientAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="tx hash" :content="txHash" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="document UUID" :content="documentUuid" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="proof" :content="proof" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
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
