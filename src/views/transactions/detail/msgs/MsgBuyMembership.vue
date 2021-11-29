<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailItemComponent
        :label="$t('labels.membershipType')"
        :content="membershipType"
      />
      <DetailLinkComponent
        :label="$t('labels.buyer')"
        :content="buyerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: buyerAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.tsp')"
        :content="tspAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: tspAddress },
        }"
        look="font-monotype"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgBuyMembership',
  description: 'Display a buy membership transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a buy membership message',
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
    membershipType() {
      return this.message.membership_type;
    },
    buyerAddress() {
      return this.message.buyer;
    },
    tspAddress() {
      return this.message.tsp;
    },
  },
};
</script>
