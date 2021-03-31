<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="recipient address"
          :content="recipientAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: recipientAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="id" :content="id" />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'status'"
          />
          <v-list-item>
            <MsgItemComponent label="type" :content="statusType" />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent label="message" :content="statusMessage" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="signer address"
          :content="signerAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: signerAddress },
          }"
        />
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
  name: 'MsgChangePowerUpStatus',
  description: 'Display a change powerup status transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
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
