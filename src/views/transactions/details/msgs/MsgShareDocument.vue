<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'sender'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: senderAddress },
              }"
              v-text="senderAddress"
            />
          </div>
        </v-list-item-content>
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
            <v-list-item-content>
              <router-link
                :to="{
                  name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                  params: { id: recipientAddress },
                }"
                v-text="recipientAddress"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-uppercase font-weight-bold"
              v-text="'uuid'"
            />
            {{ uuid }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'metadata'"
          />
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'metadata content uri'"
                />
                <a
                  :href="metadataContentUri"
                  target="_blank"
                  v-text="metadataContentUri"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
          <span v-if="metadataSchemaType !== '-'">
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="pr-3 text-capitalize font-weight-bold"
                    v-text="'metadata schema type'"
                  />
                  {{ metadataSchemaType }}
                </div>
              </v-list-item-content>
            </v-list-item>
          </span>
          <span v-else>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="pr-3 text-capitalize font-weight-bold"
                    v-text="'metadata schema uri'"
                  />
                  <a
                    :href="metadataSchemaUri"
                    target="_blank"
                    v-text="metadataSchemaUri"
                  />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="pr-3 text-capitalize font-weight-bold"
                    v-text="'meta schema version'"
                  />
                  {{ metaSchemaVersion }}
                </div>
              </v-list-item-content>
            </v-list-item>
          </span>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'content URI'"
            />
            <a :href="contentUri" target="_blank" v-text="contentUri" />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'checksum'"
          />
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'value'"
                />
                {{ checksumValue }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'algorithm'"
                />
                {{ checksumAlgorithm }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'encryption data keys'"
            />
            {{ encryptionDataKeys }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'encryption data encrypted data'"
            />
            {{ encryptionDataEncryptedData }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'do sign'"
          />
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'storage uri'"
                />
                <a
                  :href="doSignStorageUri"
                  target="_blank"
                  v-text="doSignStorageUri"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'signer instance'"
                />
                {{ doSignSigner }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'sdn data'"
                />
                {{ doSignSdn }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'vcr id'"
                />
                {{ doSignVcr }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'certificate profile'"
                />
                {{ doSignCertificate }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
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
      return this.message.value.metadata.content_uri || '-';
    },
    metadataSchemaType() {
      return this.message.value.metadata.schema_type || '-';
    },
    metadataSchemaUri() {
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
