<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.newMembership')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="newMembership"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.governmentAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, governmentAddress)"
            v-text="governmentAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.subscriber')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, subscriber)"
            v-text="subscriber"
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
  name: "MsgSetMembership",
  description: "Display a set membership transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a set membership message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    governmentAddress() {
      return this.message.value.government_address
        ? this.message.value.government_address
        : "-";
    },
    subscriber() {
      return this.message.value.subscriber
        ? this.message.value.subscriber
        : "-";
    },
    newMembership() {
      return this.message.value.new_membership
        ? this.message.value.new_membership
        : "-";
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
