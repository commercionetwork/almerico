<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.signer')"
        :content="signerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signerAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
      <BaseDetailItem :label="$t('labels.id')" :content="id" />
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
  name: 'MsgBurnCCC',
  description: 'Display a burnCCC transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a burnCCC message',
    },
  },
  data: () => ({
    ROUTES,
  }),
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
