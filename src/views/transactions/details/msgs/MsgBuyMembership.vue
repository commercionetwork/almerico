<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="membership type" :content="membershipType" />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="buyer"
          :content="buyerAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: buyerAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="tsp"
          :content="tspAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: tspAddress },
          }"
        />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgLink from '@/components/MsgLink.vue';
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgBuyMembership',
  description: 'Display a buy membership transaction message',
  components: {
    MsgItem,
    MsgLink,
    MsgTx,
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
    buyerAddress() {
      return this.message.value.buyer ? this.message.value.buyer : '-';
    },
    membershipType() {
      return this.message.value.membership_type
        ? this.message.value.membership_type
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    tspAddress() {
      return this.message.value.tsp ? this.message.value.tsp : '-';
    },
  },
};
</script>
