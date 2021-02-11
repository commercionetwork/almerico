<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="claimant" :content="claimantAddress" />
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="proof" :content="proof" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="id" :content="id" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="proof key" :content="proofKey" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgRequestDidPowerUp',
  description: 'Display a request did power up transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a request did power up message',
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
    claimantAddress() {
      return this.message.value.claimant ? this.message.value.claimant : '-';
    },
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : '-';
    },
    proofKey() {
      return this.message.value.proof_key ? this.message.value.proof_key : '-';
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
