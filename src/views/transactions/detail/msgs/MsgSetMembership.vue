<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.government')"
        :content="governmentAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: governmentAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.subscriber')"
        :content="subscriberAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: subscriberAddress },
        }"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.newMembership')"
        :content="newMembership"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';

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
