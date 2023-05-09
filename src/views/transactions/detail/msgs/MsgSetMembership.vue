<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.government')"
        :content="governmentAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: governmentAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.subscriber')"
        :content="subscriberAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: subscriberAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.newMembership')"
        :content="newMembership"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set membership message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
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
