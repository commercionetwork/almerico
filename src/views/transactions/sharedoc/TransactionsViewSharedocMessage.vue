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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.recipients')"
            />
          </v-list-item-title>
          <v-list-item
            v-for="(recipientAddress, index) in recipients"
            :key="index"
          >
            <base-detail-link
              :label="$t('labels.address')"
              :content="recipientAddress"
              :is-loop="true"
              :route="{
                name: ROUTES.NAME.ACCOUNT,
                params: { id: recipientAddress },
              }"
              look="font-monotype"
            />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <base-detail-item :label="$t('labels.uuid')" :content="uuid" />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.metadata')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.metadataContentUri')"
            :content="metadataContentUri"
          />
          <span v-if="metadataSchemaType !== '-'">
            <base-detail-item
              :label="$t('labels.metadataSchemaType')"
              :content="metadataSchemaType"
            />
          </span>
          <span v-else>
            <base-detail-item
              :label="$t('labels.metadataSchemaUri')"
              :content="metadataSchemaUri"
            />
            <base-detail-item
              :label="$t('labels.metadataSchemaVersion')"
              :content="metadataSchemaVersion"
            />
          </span>
        </v-list-item-content>
      </v-list-item>
      <base-detail-item
        :label="$t('labels.contentUri')"
        :content="contentUri"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.checksum')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.value')"
            :content="checksumValue"
          />
          <transactions-view-sharedoc-file-verify
            :checksumAlgorithm="checksumAlgorithm"
            :checksumValue="checksumValue"
          />
          <base-detail-item
            :label="$t('labels.algorithm')"
            :content="checksumAlgorithm"
          />
        </v-list-item-content>
      </v-list-item>
      <base-detail-item
        :label="$t('labels.encryptionDataKeys')"
        :content="encryptionDataKeys"
      />
      <base-detail-item
        :label="$t('labels.encryptionDataEncryptedData')"
        :content="encryptionDataEncryptedData"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.doSign')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.storageUri')"
            :content="doSignStorageUri"
          />
          <base-detail-item
            :label="$t('labels.signerInstance')"
            :content="doSignSigner"
          />
          <base-detail-item
            :label="$t('labels.sdnData')"
            :content="doSignSdn"
          />
          <base-detail-item :label="$t('labels.vcrId')" :content="doSignVcr" />
          <base-detail-item
            :label="$t('labels.certificateProfile')"
            :content="doSignCertificate"
          />
        </v-list-item-content>
      </v-list-item>
    </div>
  </base-transaction-message>
</template>

<script>
import TransactionsViewSharedocFileVerify from './TransactionsViewSharedocFileVerify.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'TransactionsViewSharedocMessage',
  description: 'Display a share document transaction message',
  components: { TransactionsViewSharedocFileVerify },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a share document message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    senderAddress() {
      return this.message.sender || '-';
    },
    recipients() {
      return this.message.recipients || [];
    },
    uuid() {
      return this.message.UUID || '-';
    },
    metadataContentUri() {
      return this.message.metadata && this.message.metadata.contentURI
        ? this.message.metadata.contentURI
        : '';
    },
    metadataSchemaType() {
      return this.message.metadata && this.message.metadata.schema_type
        ? this.message.metadata.schema_type
        : '-';
    },
    metadataSchemaUri() {
      return this.message.metadata &&
        this.message.metadata.schema &&
        this.message.metadata.schema.URI
        ? this.message.metadata.schema.URI
        : '';
    },
    metadataSchemaVersion() {
      return this.message.metadata &&
        this.message.metadata.schema &&
        this.message.metadata.schema.version
        ? this.message.metadata.schema.version
        : '-';
    },
    contentUri() {
      return this.message.contentURI || '';
    },
    checksumValue() {
      return this.message.checksum && this.message.checksum.value
        ? this.message.checksum.value
        : '-';
    },
    checksumAlgorithm() {
      return this.message.checksum && this.message.checksum.algorithm
        ? this.message.checksum.algorithm
        : '-';
    },
    encryptionDataKeys() {
      return this.message.encryptionData && this.message.encryptionData.keys
        ? JSON.stringify(this.message.encryptionData.keys)
        : '-';
    },
    encryptionDataEncryptedData() {
      return this.message.encryptionData &&
        this.message.encryptionData.encrypted_data
        ? this.message.encryptionData.encrypted_data.toString()
        : '-';
    },
    doSignStorageUri() {
      return this.message.doSign && this.message.doSign.storage_uri
        ? this.message.doSign.storage_uri
        : '';
    },
    doSignSigner() {
      return this.message.doSign && this.message.doSign.signer_instance
        ? this.message.doSign.signer_instance
        : '-';
    },
    doSignSdn() {
      return this.message.doSign && this.message.doSign.sdn_data
        ? this.message.doSign.sdn_data.toString()
        : '-';
    },
    doSignVcr() {
      return this.message.doSign && this.message.doSign.vcr_id
        ? this.message.doSign.vcr_id
        : '-';
    },
    doSignCertificate() {
      return this.message.doSign && this.message.doSign.certificate_profile
        ? this.message.doSign.certificate_profile
        : '-';
    },
  },
};
</script>
