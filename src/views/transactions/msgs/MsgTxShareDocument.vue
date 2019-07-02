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
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.sender')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(sender)"
            v-text="sender"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.receiver')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(receiver)"
            v-text="receiver"
          />
        </div>
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
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxShareDocument",
  description: "Display a share document transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a share document message"
    }
  },
  computed: {
    owner() {
      return this.message.value.owner ? this.message.value.owner : "-";
    },
    sender() {
      return this.message.value.sender ? this.message.value.sender : "-";
    },
    receiver() {
      return this.message.value.receiver ? this.message.value.receiver : "-";
    },
    reference() {
      return this.message.value.reference ? this.message.value.reference : "-";
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
