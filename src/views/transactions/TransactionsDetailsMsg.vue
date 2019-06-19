<template>
  <div class="border-bottom">
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">From</div>
      <div class="col-12 col-md-9 text-break com-font-s14-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, msgFrom)"
          v-text="msgFrom"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">To</div>
      <div class="col-12 col-md-9 text-break com-font-s14-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, msgTo)"
          v-text="msgTo"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Amount</div>
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
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
    },
    txType: {
      type: String,
      required: true,
      note: "The transaction type"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    msgAmount() {
      let comm = this.message.value.amount
        ? this.$n(this.message.value.amount[0].amount / 1000000, {
            style: "decimal",
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
          })
        : 0;
      return `${comm} COMM`;
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
