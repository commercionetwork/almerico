<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.government')"
        :content="governmentAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: governmentAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.subscriber')"
        :content="subscriberAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: subscriberAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.newMembership')"
        :content="newMembership"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
