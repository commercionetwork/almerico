<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="government" :content="governmentAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="subscriber" :content="subscriberAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="new membership" :content="newMembership" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set membership message',
    },
  },
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
