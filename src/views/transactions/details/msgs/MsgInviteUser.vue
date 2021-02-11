<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="recipient" :content="recipient" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="sender" :content="sender" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgInviteUser',
  description: 'Display a invite user transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a invite user message',
    },
  },
  computed: {
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    sender() {
      return this.message.value.sender ? this.message.value.sender : '-';
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
