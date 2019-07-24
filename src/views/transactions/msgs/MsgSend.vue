<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.fromAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toAccountDetails(fromAddress)"
            v-text="fromAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.toAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toAccountDetails(toAddress)"
            v-text="toAddress"
          />
        </div>
      </div>
      <div
        v-for="(amount,index) in amounts"
        :key="index"
        class="row p-1"
      >
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.amount')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="amountValue(amount)"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";

export default {
  name: "MsgSend",
  description: "Display a send transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a send message"
    }
  },
  computed: {
    amounts() {
      return this.message.value.amount ? this.message.value.amount : [];
    },
    fromAddress() {
      return this.message.value.from_address
        ? this.message.value.from_address
        : "-";
    },
    toAddress() {
      return this.message.value.to_address
        ? this.message.value.to_address
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    amountValue(data) {
      let amount = {
        denom: "",
        amount: 0
      };
      if (data instanceof Object) {
        amount = coinConverter(data);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
    },
    toAccountDetails(id) {
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
