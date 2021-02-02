<template>
  <MsgTx :title="title">
    <div slot="body"></div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgShareDocument',
  description: 'Display a share document transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a share document message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    checksumAlgorithm() {
      return this.message.value.checksum.algorithm || '-';
    },
    checksumValue() {
      return this.message.value.checksum.value || '-';
    },
    contentUri() {
      return this.message.value.content_uri || '-';
    },
    doSignCertificate() {
      return this.message.value.do_sign.certificate_profile || '-';
    },
    doSignSigner() {
      return this.message.value.do_sign.signer_instance || '-';
    },
    doSignSdn() {
      return this.message.value.do_sign.sdn_data || '-';
    },
    doSignStorage() {
      return this.message.value.do_sign.storage_uri || '-';
    },
    doSignVcr() {
      return this.message.value.do_sign.vcr_id || '-';
    },
    encryptionDataEncryptedData() {
      return this.message.value.encryption_data.encrypted_data || [];
    },
    encryptionDataKeys() {
      return this.message.value.encryption_data.keys || [];
    },
    metaContentUri() {
      return this.message.value.metadata.content_uri || '-';
    },
    metaSchemaType() {
      return this.message.value.metadata.schema_type || '-';
    },
    metaSchemaUri() {
      return this.message.value.metadata.schema.uri || '-';
    },
    metaSchemaVersion() {
      return this.message.value.metadata.schema.version || '-';
    },
    recipients() {
      return this.message.value.recipients || [];
    },
    senderAddress() {
      return this.message.value.sender || '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    uuid() {
      return this.message.value.uuid || '-';
    },
  },
};
</script>
