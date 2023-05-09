<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
        look="font-monotype"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgUnjail',
  description: 'Display an unjail transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an unjail message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    address() {
      return this.message.validator_addr || '-';
    },
  },
};
</script>
