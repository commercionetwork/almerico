<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgItem label="context" :content="context" />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="did"
          :content="id"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: id },
          }"
        />
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'keys'"
          />
          <v-list-item v-for="(pubKey, index) in publicKeys" :key="index">
            <v-list dense>
              <v-list-item>
                <MsgItem label="id" :content="pubKey.id" />
              </v-list-item>
              <v-list-item>
                <MsgItem label="type" :content="pubKey.type" />
              </v-list-item>
              <v-list-item>
                <MsgItem label="controller" :content="pubKey.controller" />
              </v-list-item>
              <v-list-item>
                <MsgItem
                  label="public key pem"
                  :content="pubKey.publicKeyPem"
                />
              </v-list-item>
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'proof'"
          />
          <v-list-item>
            <MsgItem label="type" :content="proofType" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="created" :content="proofCreated" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="proof purpose" :content="proofPurpose" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="controller" :content="proofController" />
          </v-list-item>
          <v-list-item>
            <MsgItem
              label="verification method"
              :content="proofVerificationMethod"
            />
          </v-list-item>
          <v-list-item>
            <MsgItem label="signature value" :content="proofSignatureValue" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'service'"
          />
          <v-list-item v-for="(service, index) in services" :key="index">
            <v-list dense>
              <v-list-item>
                <MsgItem label="id" :content="service.id" />
              </v-list-item>
              <v-list-item>
                <MsgItem label="type" :content="service.type" />
              </v-list-item>
              <v-list-item>
                <MsgItem
                  label="service endpoint"
                  :content="service.serviceEndpoint"
                />
              </v-list-item>
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgLink from '@/components/MsgLink.vue';
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetIdentity',
  description: 'Display a set identity transaction message',
  components: {
    MsgItem,
    MsgLink,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set identity message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    context() {
      return this.message.value['@context']
        ? this.message.value['@context']
        : '-';
    },
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    proofController() {
      return this.message.value.proof && this.message.value.proof.controller
        ? this.message.value.proof.controller
        : '-';
    },
    proofCreated() {
      return this.message.value.proof && this.message.value.proof.created
        ? new Date(this.message.value.proof.created).toLocaleString()
        : '-';
    },
    proofPurpose() {
      return this.message.value.proof && this.message.value.proof.proofPurpose
        ? this.message.value.proof.proofPurpose
        : '-';
    },
    proofSignatureValue() {
      return this.message.value.proof && this.message.value.proof.signatureValue
        ? this.message.value.proof.signatureValue
        : '-';
    },
    proofType() {
      return this.message.value.proof && this.message.value.proof.type
        ? this.message.value.proof.type
        : '-';
    },
    proofVerificationMethod() {
      return this.message.value.proof &&
        this.message.value.proof.verificationMethod
        ? this.message.value.proof.verificationMethod
        : '-';
    },
    publicKeys() {
      return this.message.value.publicKey ? this.message.value.publicKey : [];
    },
    services() {
      return this.message.value.service ? this.message.value.service : [];
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
