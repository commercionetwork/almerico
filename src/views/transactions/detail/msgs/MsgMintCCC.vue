<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.depositor')"
        :content="depositorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: depositorAddress },
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
      <base-detail-item :label="$t('labels.id')" :content="id" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgMintCCC',
  description: 'Display a mintCCC transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a mintCCC message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    depositorAddress() {
      return this.message.depositor;
    },
    amounts() {
      return this.message.deposit_amount.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        })
      );
    },
    id() {
      return this.message.ID;
    },
  },
};
</script>
