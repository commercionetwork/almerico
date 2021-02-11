<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="sender" :content="senderAddress" />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'recipients'"
          />
          <v-list-item
            v-for="(recipientAddress, index) in recipients"
            :key="index"
          >
            <MsgItem label="address" :content="recipientAddress" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgItem label="uuid" :content="uuid" />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'metadata'"
          />
          <v-list-item>
            <MsgItem
              label="metadata content uri"
              :content="metadataContentUri"
            />
          </v-list-item>
          <span v-if="metadataSchemaType !== '-'">
            <v-list-item>
              <MsgItem
                label="metadata schema type"
                :content="metadataSchemaType"
              />
            </v-list-item>
          </span>
          <span v-else>
            <v-list-item>
              <MsgItem
                label="metadata schema uri"
                :content="metadataSchemaUri"
              />
            </v-list-item>
            <v-list-item>
              <MsgItem
                label="meta schema version"
                :content="metaSchemaVersion"
              />
            </v-list-item>
          </span>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgItem label="content URI" :content="contentUri" />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'checksum'"
          />
          <v-list-item>
            <MsgItem label="value" :content="checksumValue" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="algorithm" :content="checksumAlgorithm" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgItem label="encryption data keys" :content="encryptionDataKeys" />
      </v-list-item>
      <v-list-item>
        <MsgItem
          label="encryption data encrypted data"
          :content="encryptionDataEncryptedData"
        />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'do sign'"
          />
          <v-list-item>
            <MsgItem label="storage uri" :content="doSignStorageUri" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="signer instance" :content="doSignSigner" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="sdn data" :content="doSignSdn" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="vcr id" :content="doSignVcr" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="certificate profile" :content="doSignCertificate" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgShareDocument',
  description: 'Display a share document transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a share document message',
    },
  },
  computed: {
    checksumAlgorithm() {
      return this.message.value.checksum && this.message.value.checksum
        ? this.message.value.checksum.algorithm
        : '-';
    },
    checksumValue() {
      return this.message.value.checksum && this.message.value.checksum.value
        ? this.message.value.checksum.value
        : '-';
    },
    contentUri() {
      return this.message.value.content_uri
        ? this.message.value.content_uri
        : '-';
    },
    doSignCertificate() {
      return this.message.value.do_sign
        ? this.message.value.do_sign.certificate_profile
        : '-';
    },
    doSignSigner() {
      return this.message.value.do_sign
        ? this.message.value.do_sign.signer_instance
        : '-';
    },
    doSignSdn() {
      return this.message.value.do_sign
        ? this.message.value.do_sign.sdn_data
        : '-';
    },
    doSignStorageUri() {
      return this.message.value.do_sign
        ? this.message.value.do_sign.storage_uri
        : '-';
    },
    doSignVcr() {
      return this.message.value.do_sign
        ? this.message.value.do_sign.vcr_id
        : '-';
    },
    encryptionDataEncryptedData() {
      return this.message.value.encryption_data
        ? this.message.value.encryption_data.encrypted_data
        : '-';
    },
    encryptionDataKeys() {
      return this.message.value.encryption_data
        ? this.message.value.encryption_data.keys
        : '-';
    },
    metadataContentUri() {
      return this.message.value.metadata &&
        this.message.value.metadata.content_uri
        ? this.message.value.metadata.content_uri
        : '-';
    },
    metadataSchemaType() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema_type
        ? this.message.value.metadata.schema_type
        : '-';
    },
    metadataSchemaUri() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema &&
        this.message.value.metadata.schema.uri
        ? this.message.value.metadata.schema.uri
        : '-';
    },
    metaSchemaVersion() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema &&
        this.message.value.metadata.schema.version
        ? this.message.value.metadata.schema.version
        : '-';
    },
    recipients() {
      return this.message.value.recipients ? this.message.value.recipients : [];
    },
    senderAddress() {
      return this.message.value.sender ? this.message.value.sender : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    uuid() {
      return this.message.value.uuid ? this.message.value.uuid : '-';
    },
  },
};
</script>
