<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
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
            v-text="$t('titles.keys')"
          />
          <v-list-item v-for="(pubKey, index) in publicKeys" :key="index">
            <v-list dense>
              <DetailItemComponent
                :label="$t('labels.id')"
                :content="pubKey.id"
              />
              <DetailItemComponent
                :label="$t('labels.type')"
                :content="pubKey.type"
              />
              <DetailLinkComponent
                :label="$t('labels.controller')"
                :content="pubKey.controller"
                :route="{
                  name: ROUTES.NAME.ACCOUNT,
                  params: { id: pubKey.controller },
                }"
                look="font-monotype"
              />
              <DetailItemComponent
                :label="$t('labels.publicKeyPem')"
                :content="pubKey.publicKeyPem"
              />
            </v-list>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.proof')"
          />
          <DetailItemComponent
            :label="$t('labels.type')"
            :content="proofType"
          />
          <DetailItemComponent
            :label="$t('labels.created')"
            :content="proofCreated"
          />
          <DetailItemComponent
            :label="$t('labels.proofPurpose')"
            :content="proofPurpose"
          />
          <DetailLinkComponent
            :label="$t('labels.controller')"
            :content="proofController"
            :route="{
              name: ROUTES.NAME.ACCOUNT,
              params: { id: proofController },
            }"
          />
          <DetailItemComponent
            :label="$t('labels.verificationMethod')"
            :content="proofVerificationMethod"
          />
          <DetailItemComponent
            :label="$t('labels.signatureValue')"
            :content="proofSignatureValue"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.service')"
          />
          <v-list-item v-for="(service, index) in services" :key="index">
            <v-list dense>
              <DetailItemComponent
                :label="$t('labels.id')"
                :content="service.id"
              />
              <DetailItemComponent
                :label="$t('labels.type')"
                :content="service.type"
              />
              <DetailItemComponent
                :label="$t('labels.serviceEndpoint')"
                :content="service.serviceEndpoint"
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
import { regExpBuilder } from '@/utils';

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
    context() {
      return this.message['@context'] || '-';
    },
    id() {
      return this.message.id || '-';
    },
    proofController() {
      return this.message.proof && this.message.proof.controller
        ? this.message.proof.controller
        : '-';
    },
    proofCreated() {
      return this.message.proof && this.message.proof.created
        ? new Date(this.message.proof.created).toLocaleString()
        : '-';
    },
    proofPurpose() {
      return this.message.proof && this.message.proof.proofPurpose
        ? this.message.proof.proofPurpose
        : '-';
    },
    proofSignatureValue() {
      return this.message.proof && this.message.proof.signatureValue
        ? this.message.proof.signatureValue
        : '-';
    },
    proofType() {
      return this.message.proof && this.message.proof.type
        ? this.message.proof.type
        : '-';
    },
    proofVerificationMethod() {
      return this.message.proof && this.message.proof.verificationMethod
        ? this.message.proof.verificationMethod
        : '-';
    },
    publicKeys() {
      return this.message.publicKey || [];
    },
    services() {
      return this.message.service || [];
    },
  },
};
</script>
