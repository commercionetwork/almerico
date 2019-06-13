<template>
  <div class="border-bottom">
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">From</div>
      <div class="col-12 col-md-9 text-break com-font-s13-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, msgFrom)"
          v-text="msgFrom"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">To</div>
      <div class="col-12 col-md-9 text-break com-font-s13-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, msgTo)"
          v-text="msgTo"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Amount</div>
      <div
        class="col-12 col-md-9 text-break com-font-s13-w400"
        v-text="msgAmount"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "TransactionsDetailsMsg",
  description: "Display the transaction's message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing the messages to display"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    msgAmount() {
      let amount = this.$n(this.message.value.amount[0].amount, {
        style: "decimal",
        maximumFractionDigits: 0
      });
      return `${amount} COMM`;
    },
    msgFrom() {
      return this.message.value.from_address;
    },
    msgTo() {
      return this.message.value.to_address;
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
