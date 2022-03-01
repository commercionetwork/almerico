<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.destinationValidatorAddress')"
        :content="validatorDstAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorDstAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.sourceValidatorAddress')"
        :content="validatorSrcAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorSrcAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
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
  name: 'MsgBeginRedelegate',
  description: 'Display a begin redelegate transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a redelegate message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    delegatorAddress() {
      return this.message.delegator_address;
    },
    validatorDstAddress() {
      return this.message.validator_dst_address;
    },
    validatorSrcAddress() {
      return this.message.validator_src_address;
    },
    amount() {
      return coinAdapter.format({
        amount: this.message.amount.amount,
        denom: this.message.amount.denom,
      });
    },
  },
};
</script>
