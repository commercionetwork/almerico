<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <v-list-item>
        <DetailLinkComponent
          :label="$t('labels.government')"
          :content="governmentAddress"
          :route="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: governmentAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <DetailLinkComponent
          :label="$t('labels.subscriber')"
          :content="subscriberAddress"
          :route="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: subscriberAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <DetailItemComponent
          :label="$t('labels.newMembership')"
          :content="newMembership"
        />
      </v-list-item>
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
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set membership message',
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
    governmentAddress() {
      return this.message.government;
    },
    subscriberAddress() {
      return this.message.subscriber;
    },
    newMembership() {
      return this.message.new_membership;
    },
  },
};
</script>
