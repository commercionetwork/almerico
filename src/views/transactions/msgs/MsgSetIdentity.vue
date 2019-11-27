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
        <div class="col-12 col-md-9 text-break com-font-s14-w400"></div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.authentication')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400"></div>
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
              v-text="$t('labels.creator')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="proofCreator"
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
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.service')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="service"
        />
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
    authentications() {
      return this.message.value.authentication
        ? this.message.value.authentication
        : [];
    },
    context() {
      return this.message.value["@context"]
        ? this.message.value["@context"]
        : "-";
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
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
    proofCreator() {
      return this.message.value.proof && this.message.value.proof.creator
        ? this.message.value.proof.creator
        : "-";
    },
    proofSig() {
      return this.message.value.proof && this.message.value.proof.signatureValue
        ? this.message.value.proof.signatureValue
        : "-";
    },
    publicKeys() {
      return this.message.value.publicKey ? this.message.value.publicKey : [];
    },
    service() {
      return this.message.value.service ? this.message.value.service : "-";
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
