<template>
  <MsgTx :title="title">
    <div slot="body">
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
          v-text="$t('labels.id')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="id"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.publicKey')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.type')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="statusType"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.message')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="statusMessage"
            />
          </dl>
        </div>
      </div>
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
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgChangePowerUpStatus",
  description: "Display a change powerup status transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a change powerup status user message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : "-";
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
    },
    statusType() {
      return this.message.value.status && this.message.value.status.type
        ? this.message.value.status.type
        : "-";
    },
    statusMessage() {
      return this.message.value.status && this.message.value.status.message
        ? this.message.value.status.message
        : "-";
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
