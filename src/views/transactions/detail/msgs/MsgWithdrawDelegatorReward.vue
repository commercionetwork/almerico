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
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgWithdrawDelegatorReward',
  description: 'Display a withdraw delegator reward transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a withdraw delegator reward message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    delegatorAddress() {
      return this.message.delegator_address || '-';
    },
    validatorAddress() {
      return this.message.validator_address || '-';
    },
  },
};
</script>
