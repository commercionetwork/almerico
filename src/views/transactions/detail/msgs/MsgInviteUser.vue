<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.recipient')"
        :content="recipient"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipient },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.sender')"
        :content="sender"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: sender },
        }"
        look="font-monotype"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgInviteUser',
  description: 'Display a invite user transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a invite user message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
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
