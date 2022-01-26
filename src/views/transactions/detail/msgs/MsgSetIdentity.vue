<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailItemComponent :label="$t('labels.context')" :content="context" />
      <DetailLinkComponent
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
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.verificationMethod')"
          />
          <v-list-item v-for="(method, i) in verificationMethod" :key="i">
            <v-list dense>
              <DetailItemComponent
                :label="$t('labels.id')"
                :content="method.ID"
              />
              <DetailItemComponent
                :label="$t('labels.type')"
                :content="method.Type"
              />
              <DetailItemComponent
                :label="$t('labels.controller')"
                :content="method.Controller"
              />
              <DetailItemComponent
                :label="$t('labels.publicKeyMultibase')"
                :content="method.publicKeyMultibase"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <DetailItemComponent
        :label="$t('labels.authentication')"
        :content="authentication"
      />
      <DetailItemComponent
        :label="$t('labels.assertionMethod')"
        :content="assertionMethod"
      />
      <DetailItemComponent
        :label="$t('labels.keyAgreement')"
        :content="keyAgreement"
      />
      <DetailItemComponent
        :label="$t('labels.capabilityInvocation')"
        :content="capabilityInvocation"
      />
      <DetailItemComponent
        :label="$t('labels.capabilityDelegation')"
        :content="capabilityDelegation"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.service')"
          />
          <v-list-item v-for="(serv, i) in service" :key="i">
            <v-list dense>
              <DetailItemComponent
                :label="$t('labels.id')"
                :content="serv.ID"
              />
              <DetailItemComponent
                :label="$t('labels.type')"
                :content="serv.type"
              />
              <DetailItemComponent
                :label="$t('labels.serviceEndpoint')"
                :content="serv.serviceEndpoint"
              />
            </v-list>
          </v-list-item>
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
  name: 'MsgSetIdentity',
  description: 'Display a set identity transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
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
      return this.message['@context'] || '-';
    },
    id() {
      return this.message.ID || '-';
    },
    verificationMethod() {
      return this.message.verificationMethod || [];
    },
    authentication() {
      return this.message.authentication || [];
    },
    assertionMethod() {
      return this.message.assertionMethod || [];
    },
    keyAgreement() {
      return this.message.keyAgreement || [];
    },
    capabilityInvocation() {
      return this.message.capabilityInvocation || [];
    },
    capabilityDelegation() {
      return this.message.capabilityDelegation || [];
    },
    service() {
      return this.message.service || [];
    },
  },
};
</script>
