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
        :label="$t('labels.validatorAddress')"
        :content="validatorAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorAddress },
        }"
        look="font-monotype"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgWithdrawDelegatorReward',
  description: 'Display a withdraw delegator reward transaction message',
  components: {
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
