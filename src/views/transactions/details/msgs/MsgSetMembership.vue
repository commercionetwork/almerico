<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLink
          label="government"
          :content="governmentAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: governmentAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="subscriber"
          :content="subscriberAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: subscriberAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItem label="new membership" :content="newMembership" />
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
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    MsgItem,
    MsgLink,
    MsgTx,
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
      return this.message.value.government
        ? this.message.value.government
        : '-';
    },
    newMembership() {
      return this.message.value.new_membership
        ? this.message.value.new_membership
        : '-';
    },
    subscriberAddress() {
      return this.message.value.subscriber
        ? this.message.value.subscriber
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
