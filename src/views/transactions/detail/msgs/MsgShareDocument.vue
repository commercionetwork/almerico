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
import DetailUrlComponent from '@/components/DetailUrlComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgShareDocument',
  description: 'Display a share document transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
    DetailUrlComponent,
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
      return this.message.uuid || '-';
    },
    metadataContentUri() {
      return this.message.metadata && this.message.metadata.content_uri
        ? this.message.metadata.content_uri
        : '-';
    },
    metadataSchemaType() {
      return this.message.metadata && this.message.metadata.schema_type
        ? this.message.metadata.schema_type
        : '-';
    },
    metadataSchemaUri() {
      return this.message.metadata &&
        this.message.metadata.schema &&
        this.message.metadata.schema.uri
        ? this.message.metadata.schema.uri
        : '-';
    },
    metadataSchemaVersion() {
      return this.message.metadata &&
        this.message.metadata.schema &&
        this.message.metadata.schema.version
        ? this.message.metadata.schema.version
        : '-';
    },
    contentUri() {
      return this.message.content_uri || '-';
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
      return this.message.encryption_data && this.message.encryption_data.keys
        ? JSON.stringify(this.message.encryption_data.keys)
        : '-';
    },
    encryptionDataEncryptedData() {
      return this.message.encryption_data &&
        this.message.encryption_data.encrypted_data
        ? this.message.encryption_data.encrypted_data.toString()
        : '-';
    },
    doSignStorageUri() {
      return this.message.do_sign && this.message.do_sign.storage_uri
        ? this.message.do_sign.storage_uri
        : '-';
    },
    doSignSigner() {
      return this.message.do_sign && this.message.do_sign.signer_instance
        ? this.message.do_sign.signer_instance
        : '-';
    },
    doSignSdn() {
      return this.message.do_sign && this.message.do_sign.sdn_data
        ? this.message.do_sign.sdn_data.toString()
        : '-';
    },
    doSignVcr() {
      return this.message.do_sign && this.message.do_sign.vcr_id
        ? this.message.do_sign.vcr_id
        : '-';
    },
    doSignCertificate() {
      return this.message.do_sign && this.message.do_sign.certificate_profile
        ? this.message.do_sign.certificate_profile
        : '-';
    },
  },
};
</script>
