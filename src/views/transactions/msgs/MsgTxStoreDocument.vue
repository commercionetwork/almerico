<template>
  <MsgTx :title="message.type">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.owner')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(owner)"
            v-text="owner"
          />
        </div>
      </div>
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.identity')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="identity"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.reference')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="reference"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.metadata')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="metadata"
      />
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxStoreDocument",
  description: "Display a store document transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a store document message"
    }
  },
  computed: {
    identity() {
      return this.message.value.identity ? this.message.value.identity : "-";
    },
    reference() {
      return this.message.value.reference ? this.message.value.reference : "-";
    },
    metadata() {
      return this.message.value.metadata ? this.message.value.metadata : "-";
    },
    owner() {
      return this.message.value.owner ? this.message.value.owner : "-";
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
