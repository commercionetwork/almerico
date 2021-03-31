<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="government"
          :content="governmentAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: governmentAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="subscriber"
          :content="subscriberAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: subscriberAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="new membership" :content="newMembership" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
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
