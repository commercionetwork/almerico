<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.fromAddress')"
        :content="fromAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: fromAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.toAddress')"
        :content="toAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: toAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <base-detail-item
          :label="$t('labels.amount')"
          :content="amount"
          :is-loop="true"
          look="text-uppercase"
        />
      </v-list-item>
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgSend',
  description: 'Display a send transaction message',
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
