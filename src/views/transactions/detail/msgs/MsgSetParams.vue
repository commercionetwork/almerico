<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.signer')"
        :content="signer"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signer },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.conversionRate')"
        :content="conversionRate"
      />
      <BaseDetailItem
        :label="$t('labels.freezePeriod')"
        :content="freezePeriod"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetParams',
  description: 'Display a set params transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
