<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.signer')"
        :content="signerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signerAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
      <base-detail-item :label="$t('labels.id')" :content="id" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgBurnCCC',
  description: 'Display a burnCCC transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a burnCCC message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    signerAddress() {
      return this.message.signer;
    },
    amount() {
      return coinAdapter.format({
        amount: this.message.amount.amount,
        denom: this.message.amount.denom,
      });
    },
    id() {
      return this.message.ID;
    },
  },
};
</script>
