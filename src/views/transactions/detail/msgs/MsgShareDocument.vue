<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
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
          <DetailUrlComponent
            :label="$t('labels.metadataContentUri')"
            :content="metadataContentUri"
            :link="metadataContentUri"
          />
          <span v-if="metadataSchemaType !== '-'">
            <DetailItemComponent
              :label="$t('labels.metadataSchemaType')"
              :content="metadataSchemaType"
            />
          </span>
          <span v-else>
            <DetailUrlComponent
              :label="$t('labels.metadataSchemaUri')"
              :content="metadataSchemaUri"
              :link="metadataSchemaUri"
            />
            <DetailItemComponent
              :label="$t('labels.metadataSchemaVersion')"
              :content="metadataSchemaVersion"
            />
          </span>
        </v-list-item-content>
      </v-list-item>
      <DetailUrlComponent
        :label="$t('labels.contentUri')"
        :content="contentUri"
        :link="contentUri"
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
          <DetailUrlComponent
            :label="$t('labels.storageUri')"
            :content="doSignStorageUri"
            :link="doSignStorageUri"
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
import DetailUrlComponent from '@/components/DetailUrlComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgShareDocument',
  description: 'Display a share document transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    DetailUrlComponent,
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
  }),
  computed: {
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getMessageTypeRegExp(),
      )[0];
      return lastSegment.substring(1);
    },
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getMessageSourceRegExp(),
      )[0];
      return firstSegments.substring(1);
    },
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
