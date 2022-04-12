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
      <BaseDetailItem
        :label="$t('labels.instantiatePermission')"
        :content="instantiatePermission"
      />
      <BaseDetailItem
        :label="$t('labels.wasmByteCode')"
        :content="wasmByteCode"
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
  name: 'MsgStoreCode',
  description: 'Display a store code transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a store code message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    instantiatePermission() {
      return this.message.instantiate_permission
        ? this.message.instantiate_permission
        : '-';
    },
    senderAddress() {
      return this.message.sender;
    },
    wasmByteCode() {
      return this.message.wasm_byte_code;
    },
  },
};
</script>
