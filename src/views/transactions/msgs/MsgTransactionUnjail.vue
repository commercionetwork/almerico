<template>
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
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTransactionUnjail",
  description: "Display an unjail transaction message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing an unjail message"
    }
  },
  computed: {
    address() {
      return this.message.value.address ? this.message.value.address : "-";
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
