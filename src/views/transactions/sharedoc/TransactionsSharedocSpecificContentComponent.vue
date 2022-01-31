<template>
  <TxMsgComponent :message="message" :id="uuid">
    <v-tooltip top slot="export">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard">
          <v-icon small>
            {{ !copied ? 'mdi-export-variant' : 'mdi-check-all' }}
          </v-icon>
        </v-btn>
      </template>
      <span v-text="$t('msgs.copy')" />
    </v-tooltip>
    <div slot="body">
      <DetailLinkComponent
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
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.recipients')"
          />
          <v-list-item
            v-for="(recipientAddress, index) in recipients"
            :key="index"
          >
            <DetailLinkComponent
              :label="$t('labels.address')"
              :content="recipientAddress"
              :isLoop="true"
              :route="{
                name: ROUTES.NAME.ACCOUNT,
                params: { id: recipientAddress },
              }"
              look="font-monotype"
            />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <DetailItemComponent :label="$t('labels.uuid')" :content="uuid" />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.metadata')"
          />
          <DetailItemComponent
            :label="$t('labels.metadataContentUri')"
            :content="metadataContentUri"
          />
          <span v-if="metadataSchemaType !== '-'">
            <DetailItemComponent
              :label="$t('labels.metadataSchemaType')"
              :content="metadataSchemaType"
            />
          </span>
          <span v-else>
            <DetailItemComponent
              :label="$t('labels.metadataSchemaUri')"
              :content="metadataSchemaUri"
            />
            <DetailItemComponent
              :label="$t('labels.metadataSchemaVersion')"
              :content="metadataSchemaVersion"
            />
          </span>
        </v-list-item-content>
      </v-list-item>
      <DetailItemComponent
        :label="$t('labels.contentUri')"
        :content="contentUri"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.checksum')"
          />
          <DetailItemComponent
            :label="$t('labels.value')"
            :content="checksumValue"
          />
          <DetailItemComponent
            :label="$t('labels.algorithm')"
            :content="checksumAlgorithm"
          />
        </v-list-item-content>
      </v-list-item>
      <DetailItemComponent
        :label="$t('labels.encryptionDataKeys')"
        :content="encryptionDataKeys"
      />
      <DetailItemComponent
        :label="$t('labels.encryptionDataEncryptedData')"
        :content="encryptionDataEncryptedData"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.doSign')"
          />
          <DetailItemComponent
            :label="$t('labels.storageUri')"
            :content="doSignStorageUri"
          />
          <DetailItemComponent
            :label="$t('labels.signerInstance')"
            :content="doSignSigner"
          />
          <DetailItemComponent
            :label="$t('labels.sdnData')"
            :content="doSignSdn"
          />
          <DetailItemComponent
            :label="$t('labels.vcrId')"
            :content="doSignVcr"
          />
          <DetailItemComponent
            :label="$t('labels.certificateProfile')"
            :content="doSignCertificate"
          />
        </v-list-item-content>
      </v-list-item>
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'TransactionsSharedocSpecificContentComponent',
  description: 'Display a share document transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
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
    copied: false,
  }),
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
  methods: {
    copyToClipboard() {
      const link = `${location.protocol}//${location.host}${location.pathname}#${this.uuid}`;
      navigator.clipboard.writeText(link).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      });
    },
  },
};
</script>
