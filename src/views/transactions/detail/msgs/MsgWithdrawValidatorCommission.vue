<template>
  <base-transaction-message :message="message">
    <div slot="body">
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
  name: 'MsgWithdrawValidatorCommission',
  description: 'Display a withdraw validator commission transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a withdraw validator commission message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    validatorAddress() {
      return this.message.validator_address || '-';
    },
  },
};
</script>
