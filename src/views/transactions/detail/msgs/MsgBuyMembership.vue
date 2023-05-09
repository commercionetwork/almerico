<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-item
        :label="$t('labels.membershipType')"
        :content="membershipType"
      />
      <base-detail-link
        :label="$t('labels.buyer')"
        :content="buyerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: buyerAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.tsp')"
        :content="tspAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: tspAddress },
        }"
        look="font-monotype"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgBuyMembership',
  description: 'Display a buy membership transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a buy membership message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
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
