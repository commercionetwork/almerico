<template>
  <MsgTx :title="title">
    <div slot="body">
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
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, recipient)"
            v-text="recipient"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.hash')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.TRANSACTION_DETAILS, txHash)"
            v-text="txHash"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.documentUuid')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="documentUuid"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.proof')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <a
            :href="proof"
            target="_blank"
            v-text="proof"
          />
        </div>
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgSendDocumentReceipt",
  description: "Display a send document transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a send document message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    uuid() {
      return this.message.value.uuid ? this.message.value.uuid : "-";
    },
    sender() {
      return this.message.value.sender ? this.message.value.sender : "-";
    },
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : "-";
    },
    txHash() {
      return this.message.value.tx_hash ? this.message.value.tx_hash : "-";
    },
    documentUuid() {
      return this.message.value.document_uuid
        ? this.message.value.document_uuid
        : "-";
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : "-";
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