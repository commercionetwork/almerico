<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.signer')"
        :content="signer"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signer },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.conversionRate')"
        :content="conversionRate"
      />
      <base-detail-item
        :label="$t('labels.freezePeriod')"
        :content="freezePeriod"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetParams',
  description: 'Display a set params transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    conversionRate() {
      return this.message.params.conversion_rate;
    },
    freezePeriod() {
      return this.message.params.freeze_period;
    },
    signer() {
      return this.message.signer;
    },
  },
};
</script>
