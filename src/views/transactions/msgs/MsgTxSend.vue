<template>
  <MsgTx :title="message.type">
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
          v-text="amountLabel(index)"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="amountValue(amount.amount)"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxSend",
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
    }
  },
  methods: {
    amountLabel(index) {
      const label = this.$t("labels.amount");
      return `${label} (${index + 1})`;
    },
    amountValue(amount) {
      const comm = parseFloat(amount) / 1000000;
      const formatComm = this.$n(comm, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatComm} COMM`;
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
