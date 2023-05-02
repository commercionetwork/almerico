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
      <base-detail-item :label="$t('labels.admin')" :content="admin" />
      <base-detail-item :label="$t('labels.codeId')" :content="codeId" />
      <base-detail-item :label="$t('labels.label')" :content="label" />
      <base-detail-item :label="$t('labels.msg')" :content="msg" />
      <base-detail-item :label="$t('labels.funds')" :content="funds" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgInstantiateContract',
  description: 'Display an instantiate contract transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an instantiate contract message',
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
    admin() {
      return this.message.admin;
    },
    codeId() {
      return this.message.code_id;
    },
    label() {
      return this.message.label;
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
