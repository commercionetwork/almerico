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
        :label="$t('labels.validatorAddress')"
        :content="validatorAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.amount')"
        :content="amount"
        look="text-uppercase"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgUndelegate',
  description: 'Display an undelegate transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an undelegate message',
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
    validatorAddress() {
      return this.message.validator_address;
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
