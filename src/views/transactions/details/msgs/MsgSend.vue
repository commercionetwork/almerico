<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="from address" :content="fromAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="to address" :content="toAddress" />
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgSend',
  description: 'Display a send transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  computed: {
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.amount) {
        amounts.push(`${amount.amount} ${amount.denom}`);
      }
      return amounts;
    },
    fromAddress() {
      return this.message.value.from_address
        ? this.message.value.from_address
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    toAddress() {
      return this.message.value.to_address
        ? this.message.value.to_address
        : '-';
    },
  },
};
</script>
