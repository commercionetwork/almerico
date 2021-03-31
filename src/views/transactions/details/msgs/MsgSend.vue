<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="from address"
          :content="fromAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: fromAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="to address"
          :content="toAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: toAddress },
          }"
        />
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <MsgItemComponent
          label="amount"
          :content="amount"
          class="text-uppercase"
        />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgSend',
  description: 'Display a send transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.amount) {
        amounts.push(
          coinAdapter.format({
            amount: amount.amount,
            denom: amount.denom,
          }),
        );
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
