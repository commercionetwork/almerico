<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <v-list-item>
        <DetailLinkComponent
          :label="$t('labels.signer')"
          :content="signer"
          :route="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: signer },
          }"
        />
      </v-list-item>
      <v-list-item>
        <DetailItemComponent :label="$t('labels.rate')" :content="rate" />
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
  name: 'MsgSetCCCConversionRate',
  description: 'Display a transaction message of set conversion rate type',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set conversion rate message',
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
    signer() {
      return this.message.signer;
    },
    rate() {
      return this.message.rate;
    },
  },
};
</script>
