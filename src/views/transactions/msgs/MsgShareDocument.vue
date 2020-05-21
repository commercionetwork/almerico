<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.sender')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, sender)"
            v-text="sender"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.recipient')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <div
            v-for="(recipient, index) in recipients"
            :key="index"
          >
            <router-link
              :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, recipient)"
              v-text="recipient"
            />
          </div>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.uuid')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="uuid"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.metadata')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.contentUri')"
            />
            <dd class="com-font-s14-w400">
              <a
                :href="metaContentUri"
                target="_blank"
                v-text="metaContentUri"
              />
            </dd>
            <span v-if="metaSchemaType != '-'">
              <dt
                class="com-font-s14-w700"
                v-text="$t('labels.schemaType')"
              />
              <dd
                class="com-font-s14-w400"
                v-text="metaSchemaType"
              />
            </span>
            <span v-else>
              <dt
                class="com-font-s14-w700"
                v-text="$t('labels.schemaUri')"
              />
              <dd class="com-font-s14-w400">
                <a
                  :href="metaSchemaUri"
                  target="_blank"
                  v-text="metaSchemaUri"
                />
              </dd>
              <dt
                class="com-font-s14-w700"
                v-text="$t('labels.schemaVersion')"
              />
              <dd
                class="com-font-s14-w400"
                v-text="metaSchemaVersion"
              />
            </span>
          </dl>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.contentUri')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <a
            :href="contentUri"
            target="_blank"
            v-text="contentUri"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.checksum')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.value')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="checksumValue"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.algorithm')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="checksumAlgorithm"
            />
          </dl>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.encryptionKeys')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl
            v-for="(key, index) in encryptionDataKeys"
            :key="index"
          >
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.recipient')"
            />
            <dd class="com-font-s14-w400">
              <router-link
                :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, key.recipient)"
                v-text="key.recipient"
              />
            </dd>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.value')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="key.value"
            />
          </dl>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.encryptedData')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <div
            v-for="(data, index) in encryptionDataEnData"
            :key="index"
          >
            <span v-text="data" />
          </div>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.doSign')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.storageUri')"
            />
            <dd class="com-font-s14-w400">
              <a
                :href="doSignStorage"
                target="_blank"
                v-text="doSignStorage"
              />
            </dd>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.signerInstance')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="doSignSigner"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.sdnData')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="doSignSdn"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.vcrId')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="doSignVcr"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.certificateProfile')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="doSignCertificate"
            />
          </dl>
        </div>
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgShareDocument",
  description: "Display a share document transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a share document message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    sender() {
      return this.message.value.sender ? this.message.value.sender : "-";
    },
    recipients() {
      return this.message.value.recipients ? this.message.value.recipients : [];
    },
    uuid() {
      return this.message.value.uuid ? this.message.value.uuid : "-";
    },
    metaContentUri() {
      return this.message.value.metadata &&
        this.message.value.metadata.content_uri
        ? this.message.value.metadata.content_uri
        : "-";
    },
    metaSchemaType() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema_type
        ? this.message.value.metadata.schema_type
        : "-";
    },
    metaSchemaUri() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema &&
        this.message.value.metadata.schema.uri
        ? this.message.value.metadata.schema.uri
        : "-";
    },
    metaSchemaVersion() {
      return this.message.value.metadata &&
        this.message.value.metadata.schema &&
        this.message.value.metadata.schema.version
        ? this.message.value.metadata.schema.version
        : "-";
    },
    contentUri() {
      return this.message.value.content_uri
        ? this.message.value.content_uri
        : "-";
    },
    checksumValue() {
      return this.message.value.checksum && this.message.value.checksum.value
        ? this.message.value.checksum.value
        : "-";
    },
    checksumAlgorithm() {
      return this.message.value.checksum && this.message.value.checksum
        ? this.message.value.checksum.algorithm
        : "-";
    },
    encryptionDataKeys() {
      return this.message.value.encryption_data &&
        this.message.value.encryption_data.keys
        ? this.message.value.encryption_data.keys
        : [];
    },
    encryptionDataEnData() {
      return this.message.value.encryption_data &&
        this.message.value.encryption_data.encrypted_data
        ? this.message.value.encryption_data.encrypted_data
        : [];
    },
    doSignStorage() {
      return this.message.value.do_sign &&
        this.message.value.do_sign.storage_uri
        ? this.message.value.do_sign.storage_uri
        : "-";
    },
    doSignSigner() {
      return this.message.value.do_sign &&
        this.message.value.do_sign.signer_instance
        ? this.message.value.do_sign.signer_instance
        : "-";
    },
    doSignSdn() {
      return this.message.value.do_sign &&
        this.message.value.do_sign.sdn_data &&
        this.message.value.do_sign.sdn_data.length > 0
        ? this.message.value.do_sign.sdn_data.join(", ")
        : "-";
    },
    doSignVcr() {
      return this.message.value.do_sign && this.message.value.do_sign.vcr_id
        ? this.message.value.do_sign.vcr_id
        : "-";
    },
    doSignCertificate() {
      return this.message.value.do_sign &&
        this.message.value.do_sign.certificate_profile
        ? this.message.value.do_sign.certificate_profile
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
