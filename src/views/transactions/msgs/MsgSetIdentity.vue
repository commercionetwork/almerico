<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.context')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <a
            :href="context"
            target="_blank"
            v-text="context"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.id')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(id)"
            v-text="id"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.publicKey')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl
            class="border-bottom"
            v-for="(pubKey, index) in publicKeys"
            :key="index"
          >
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.id')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="pubKey.id"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.type')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="pubKey.type"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.controller')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="pubKey.controller"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.publicKey')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="pubKey.publicKeyPem"
            />
          </dl>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.proof')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.type')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofType"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.created')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofCreated"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.proofPurpose')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofPurpose"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.controller')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofController"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.verificationMethod')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofVerif"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.signatureValue')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofSig"
            />
          </dl>
        </div>
      </div>
      <div
        v-if="services.length > 0"
        class="row p-1"
      >
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.service')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl
            class="border-bottom"
            v-for="(service, index) in services"
            :key="index"
          >
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.id')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="service.id"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.type')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="service.type"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.serviceEndpoint')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="service.serviceEndpoint"
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
  name: "MsgSetIdentity",
  description: "Display a set identity transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a set identity message"
    }
  },
  computed: {
    context() {
      return this.message.value["@context"]
        ? this.message.value["@context"]
        : "-";
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
    },
    publicKeys() {
      return this.message.value.publicKey ? this.message.value.publicKey : [];
    },
    proofType() {
      return this.message.value.proof && this.message.value.proof.type
        ? this.message.value.proof.type
        : "-";
    },
    proofCreated() {
      return this.message.value.proof && this.message.value.proof.created
        ? this.$d(new Date(this.message.value.proof.created))
        : "-";
    },
    proofPurpose() {
      return this.message.value.proof && this.message.value.proof.proofPurpose
        ? this.message.value.proof.proofPurpose
        : "-";
    },
    proofController() {
      return this.message.value.proof && this.message.value.proof.controller
        ? this.message.value.proof.controller
        : "-";
    },
    proofVerif() {
      return this.message.value.proof &&
        this.message.value.proof.verificationMethod
        ? this.message.value.proof.verificationMethod
        : "-";
    },
    proofSig() {
      return this.message.value.proof && this.message.value.proof.signatureValue
        ? this.message.value.proof.signatureValue
        : "-";
    },
    services() {
      return this.message.value.service ? this.message.value.service : [];
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    toDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
