<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.recipient')"
        :content="recipient"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: recipient },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.sender')"
        :content="sender"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: sender },
        }"
        look="font-monotype"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgInviteUser',
  description: 'Display a invite user transaction message',
  components: {
    DetailLinkComponent,
    TxMsgComponent,
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
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getMessageTypeRegExp(),
      )[0];
      return lastSegment.substring(1);
    },
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getMessageSourceRegExp(),
      )[0];
      return firstSegments.substring(1);
    },
    recipient() {
      return this.message.recipient;
    },
    sender() {
      return this.message.sender;
    },
  },
};
</script>
