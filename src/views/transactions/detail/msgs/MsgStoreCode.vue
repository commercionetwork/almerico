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
      <base-detail-item
        :label="$t('labels.instantiatePermission')"
        :content="instantiatePermission"
      />
      <base-detail-item
        :label="$t('labels.wasmByteCode')"
        :content="wasmByteCode"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgStoreCode',
  description: 'Display a store code transaction message',
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
