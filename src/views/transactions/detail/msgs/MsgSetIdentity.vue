<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailItem :label="$t('labels.context')" :content="context" />
      <BaseDetailLink
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
          <v-list-item-title
            class="text-capitalize"
            v-text="$t('labels.verificationMethod')"
          />
          <v-list-item
            v-for="(method, index) in verificationMethod"
            :key="index"
          >
            <v-list dense>
              <BaseDetailItem :label="$t('labels.id')" :content="method.ID" />
              <BaseDetailItem
                :label="$t('labels.type')"
                :content="method.Type"
              />
              <BaseDetailItem
                :label="$t('labels.controller')"
                :content="method.Controller"
              />
              <BaseDetailItem
                :label="$t('labels.publicKeyMultibase')"
                :content="method.publicKeyMultibase"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <BaseDetailItem
        :label="$t('labels.authentication')"
        :content="authentication"
      />
      <BaseDetailItem
        :label="$t('labels.assertionMethod')"
        :content="assertionMethod"
      />
      <BaseDetailItem
        :label="$t('labels.keyAgreement')"
        :content="keyAgreement"
      />
      <BaseDetailItem
        :label="$t('labels.capabilityInvocation')"
        :content="capabilityInvocation"
      />
      <BaseDetailItem
        :label="$t('labels.capabilityDelegation')"
        :content="capabilityDelegation"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize"
            v-text="$t('labels.service')"
          />
          <v-list-item v-for="(serv, index) in service" :key="index">
            <v-list dense>
              <BaseDetailItem :label="$t('labels.id')" :content="serv.ID" />
              <BaseDetailItem :label="$t('labels.type')" :content="serv.type" />
              <BaseDetailItem
                :label="$t('labels.serviceEndpoint')"
                :content="serv.serviceEndpoint"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetIdentity',
  description: 'Display a set identity transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
