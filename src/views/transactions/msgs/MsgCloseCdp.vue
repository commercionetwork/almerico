<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.signer')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, signer)"
            v-text="signer"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.cdpTimestamp')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="cdpTimestamp"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgCloseCdp",
  description: "Display a close CDP transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a close CDP message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    cdpTimestamp() {
      return this.message.value.cdp_timestamp ? this.message.value.cdp_timestamp : "-";
    },
    signer() {
      return this.message.value.signer ? this.message.value.signer : "-";
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
