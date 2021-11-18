<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
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
  name: 'MsgUnjail',
  description: 'Display an unjail transaction message',
  components: {
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an unjail message',
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
    address() {
      return this.message.address || '-';
    },
  },
};
</script>
