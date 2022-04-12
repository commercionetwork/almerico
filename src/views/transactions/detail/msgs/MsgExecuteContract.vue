<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailLink
        :label="$t('labels.sender')"
        :content="senderAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: senderAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem :label="$t('labels.contract')" :content="contract" />
      <BaseDetailItem :label="$t('labels.msg')" :content="msg" />
      <BaseDetailItem :label="$t('labels.funds')" :content="funds" />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgExecuteContract',
  description: 'Display an execute contract transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an execute contract message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    senderAddress() {
      return this.message.sender;
    },
    contract() {
      return this.message.contract;
    },
    msg() {
      return this.message.msg;
    },
    funds() {
      return this.message.funds;
    },
  },
};
</script>
