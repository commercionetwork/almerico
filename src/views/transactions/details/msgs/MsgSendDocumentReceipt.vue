<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-uppercase font-weight-bold"
              v-text="'uuid'"
            />
            {{ uuid }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'sender'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: senderAddress },
              }"
              v-text="senderAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'recipient'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: recipientAddress },
              }"
              v-text="recipientAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'tx hash'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
                params: { id: txHash },
              }"
              v-text="txHash"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'document UUID'"
            />
            {{ documentUuid }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'proof'"
            />
            {{ proof }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSendDocumentReceipt',
  description: 'Display a send document transaction message',
  components: {
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
