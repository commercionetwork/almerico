<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailItem
        :label="$t('labels.membershipType')"
        :content="membershipType"
      />
      <BaseDetailLink
        :label="$t('labels.buyer')"
        :content="buyerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: buyerAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.tsp')"
        :content="tspAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: tspAddress },
        }"
        look="font-monotype"
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
  name: 'MsgBuyMembership',
  description: 'Display a buy membership transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
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
