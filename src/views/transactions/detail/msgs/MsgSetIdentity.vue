<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-item :label="$t('labels.context')" :content="context" />
      <base-detail-link
        :label="$t('labels.did')"
        :content="id"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: id },
        }"
        look="font-monotype"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize"
              v-text="$t('labels.verificationMethod')"
            />
          </v-list-item-title>
          <v-list-item
            v-for="(method, index) in verificationMethod"
            :key="index"
          >
            <v-list dense>
              <base-detail-item :label="$t('labels.id')" :content="method.ID" />
              <base-detail-item
                :label="$t('labels.type')"
                :content="method.Type"
              />
              <base-detail-item
                :label="$t('labels.controller')"
                :content="method.Controller"
              />
              <base-detail-item
                :label="$t('labels.publicKeyMultibase')"
                :content="method.publicKeyMultibase"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <base-detail-item
        :label="$t('labels.authentication')"
        :content="authentication"
      />
      <base-detail-item
        :label="$t('labels.assertionMethod')"
        :content="assertionMethod"
      />
      <base-detail-item
        :label="$t('labels.keyAgreement')"
        :content="keyAgreement"
      />
      <base-detail-item
        :label="$t('labels.capabilityInvocation')"
        :content="capabilityInvocation"
      />
      <base-detail-item
        :label="$t('labels.capabilityDelegation')"
        :content="capabilityDelegation"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span class="text-capitalize" v-text="$t('labels.service')" />
          </v-list-item-title>
          <v-list-item v-for="(serv, index) in service" :key="index">
            <v-list dense>
              <base-detail-item :label="$t('labels.id')" :content="serv.ID" />
              <base-detail-item
                :label="$t('labels.type')"
                :content="serv.type"
              />
              <base-detail-item
                :label="$t('labels.serviceEndpoint')"
                :content="serv.serviceEndpoint"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetIdentity',
  description: 'Display a set identity transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set identity message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    didDocument() {
      return this.message.didDocument;
    },
    context() {
      return this.didDocument.context || '-';
    },
    id() {
      return this.didDocument.ID || '-';
    },
    verificationMethod() {
      return this.didDocument.verificationMethod || '-';
    },
    authentication() {
      return this.didDocument.authentication || '-';
    },
    assertionMethod() {
      return this.didDocument.assertionMethod || '-';
    },
    keyAgreement() {
      return this.didDocument.keyAgreement || '-';
    },
    capabilityInvocation() {
      return this.didDocument.capabilityInvocation || '-';
    },
    capabilityDelegation() {
      return this.didDocument.capabilityDelegation || '-';
    },
    service() {
      return this.didDocument.service || '-';
    },
  },
};
</script>
