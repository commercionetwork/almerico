<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="delegator address" :content="delegatorAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="validator address" :content="validatorAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgUndelegate',
  description: 'Display an undelegate transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an undelegate message',
    },
  },
  computed: {
    amount() {
      return `${this.message.value.amount.amount} ${this.message.value.amount.denom}`;
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
        : '-';
    },
  },
};
</script>
