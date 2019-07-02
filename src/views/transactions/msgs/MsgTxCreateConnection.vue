<template>
  <MsgTx :title="message.type">
    <div slot="body">
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
          v-text="$t('labels.firstUser')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="firstUser"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.secondUser')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="secondUser"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxCreateConnection",
  description: "Display a create connection transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a create connection message"
    }
  },
  computed: {
    firstUser() {
      return this.message.value.first_user
        ? this.message.value.first_user
        : "-";
    },
    secondUser() {
      return this.message.value.second_user
        ? this.message.value.second_user
        : "-";
    },
    signer() {
      return this.message.value.signer ? this.message.value.signer : "-";
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
