<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.fromAddress')"
        :content="fromAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: fromAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.toAddress')"
        :content="toAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: toAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <BaseDetailItem
          :label="$t('labels.amount')"
          :content="amount"
          :is-loop="true"
          look="text-uppercase"
        />
      </v-list-item>
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgSend',
  description: 'Display a send transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    fromAddress() {
      return this.message.from_address;
    },
    toAddress() {
      return this.message.to_address;
    },
    amounts() {
      return this.message.amount.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        })
      );
    },
  },
};
</script>
