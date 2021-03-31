<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="recipient"
          :content="recipient"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: recipient },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="sender"
          :content="sender"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: sender },
          }"
        />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgInviteUser',
  description: 'Display a invite user transaction message',
  components: {
    MsgLinkComponent,
    MsgTxComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a invite user message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    sender() {
      return this.message.value.sender ? this.message.value.sender : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
