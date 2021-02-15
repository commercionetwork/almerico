<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLink
          label="recipient address"
          :content="recipientAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: recipientAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItem label="id" :content="id" />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'status'"
          />
          <v-list-item>
            <MsgItem label="type" :content="statusType" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="message" :content="statusMessage" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="signer address"
          :content="signerAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: signerAddress },
          }"
        />
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
  name: 'MsgChangePowerUpStatus',
  description: 'Display a change powerup status transaction message',
  components: {
    MsgItem,
    MsgLink,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a change powerup status user message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    recipientAddress() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    signerAddress() {
      return this.message.value.signer ? this.message.value.signer : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    statusMessage() {
      return this.message.value.status
        ? this.message.value.status.message
        : '-';
    },
    statusType() {
      return this.message.value.status ? this.message.value.status.type : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
