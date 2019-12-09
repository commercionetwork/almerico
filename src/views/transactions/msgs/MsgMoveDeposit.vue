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
          v-text="$t('labels.depositProof')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="depositProof"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgMoveDeposit",
  description: "Display a move deposit transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a move deposit message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    depositProof() {
      return this.message.value.deposit_proof
        ? this.message.value.deposit_proof
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
