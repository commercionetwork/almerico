<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.recipient')"
        :content="recipient"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipient },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.sender')"
        :content="sender"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: sender },
        }"
        look="font-monotype"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgInviteUser',
  description: 'Display a invite user transaction message',
  components: {
    BaseDetailLink,
    BaseTransactionMessage,
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
      return this.message.recipient;
    },
    sender() {
      return this.message.sender;
    },
  },
};
</script>
