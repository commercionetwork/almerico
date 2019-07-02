<template>
  <div class="p-1 rounded bg-white border">
    <div class="row p-1">
      <div class="col-12">
        <h3
          class="com-font-s16-w700"
          v-text="message.type"
        />
      </div>
    </div>
    <hr>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.address')"
      />
      <div class="col-12 col-md-9 text-break com-font-s14-w400">
        <router-link
          :to="toValidatorDetails(address)"
          v-text="address"
        />
      </div>
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.commissionRate')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="commissionRate"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.minSelfDelegation')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="minSelfDelegation"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgEditValidator",
  description: "Display an edit validator transaction message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing an edit validator message"
    }
  },
  computed: {
    address() {
      return this.message.value.address ? this.message.value.address : "-";
    },
    commissionRate() {
      return this.message.value.commission_rate ? this.message.value.commission_rate : "-";
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation ? this.message.value.min_self_delegation : "-";
    }
  },
  methods: {
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATORS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
