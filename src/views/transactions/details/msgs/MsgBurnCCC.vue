<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="signer" :content="signerAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="id" :content="id" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgBurnCCC',
  description: 'Display a burnCCC transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a burnCCC message',
    },
  },
  computed: {
    amount() {
      return `${this.message.value.amount.amount} ${this.message.value.amount.denom}`;
    },
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    signerAddress() {
      return this.message.value.signer ? this.message.value.signer : '-';
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
