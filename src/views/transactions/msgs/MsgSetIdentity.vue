<template>
  <MsgTx :title="title">
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
          v-text="$t('labels.did')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="did"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.ddoReference')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="ddoReference"
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
    did() {
      return this.message.value.did ? this.message.value.did : "-";
    },
    ddoReference() {
      return this.message.value.ddo_reference
        ? this.message.value.ddo_reference
        : "-";
    },
    owner() {
      return this.message.value.owner ? this.message.value.owner : "-";
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
