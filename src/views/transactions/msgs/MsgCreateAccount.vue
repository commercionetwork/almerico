<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.address')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="address"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.signer')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(signer)"
            v-text="signer"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.keyType')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="keyType"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.keyValue')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="keyValue"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgCreateAccount",
  description: "Display a create account transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a create account message"
    }
  },
  computed: {
    address() {
      return this.message.value.address ? this.message.value.address : "-";
    },
    keyType() {
      return this.message.value.key_type ? this.message.value.key_type : "-";
    },
    keyValue() {
      return this.message.value.key_value ? this.message.value.key_value : "-";
    },
    signer() {
      return this.message.value.signer ? this.message.value.signer : "-";
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
