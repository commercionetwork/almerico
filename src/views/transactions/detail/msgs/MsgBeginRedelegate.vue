<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.destinationValidatorAddress')"
        :content="validatorDstAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorDstAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.sourceValidatorAddress')"
        :content="validatorSrcAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorSrcAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgBeginRedelegate',
  description: 'Display a begin redelegate transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a redelegate message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
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
