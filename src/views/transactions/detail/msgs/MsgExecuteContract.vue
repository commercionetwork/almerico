<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-link
        :label="$t('labels.sender')"
        :content="senderAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: senderAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item :label="$t('labels.contract')" :content="contract" />
      <base-detail-item :label="$t('labels.msg')" :content="msg" />
      <base-detail-item :label="$t('labels.funds')" :content="funds" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgExecuteContract',
  description: 'Display an execute contract transaction message',
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
